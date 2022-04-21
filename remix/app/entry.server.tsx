import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";
import { ThemeProvider } from "@mui/material/styles";
//@ts-ignore
import theme from "./utils/theme";

export default function handleRequest(request: Request, responseStatusCode: number, responseHeaders: Headers, remixContext: EntryContext) {
    const cache = createCache({ key: "css" });
    const { extractCriticalToChunks } = createEmotionServer(cache);

    const MuiRemixServer = () => (
        <ThemeProvider theme={theme}>
            <RemixServer context={remixContext} url={request.url} />
        </ThemeProvider>
    );

    // Render the component to a string.
    const html = renderToString(<MuiRemixServer />);

    // Grab the CSS from emotion
    const { styles } = extractCriticalToChunks(html);

    let stylesHTML = "";

    styles.forEach(({ key, ids, css }) => {
        const emotionKey = `${key} ${ids.join(" ")}`;
        const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
        stylesHTML = `${stylesHTML}${newStyleTag}`;
    });

    // Add the emotion style tags after the insertion point meta tag
    const markup = html.replace(
        /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
        `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`
    );

    responseHeaders.set("Content-Type", "text/html");

    return new Response(`<!DOCTYPE html>${markup}`, {
        status: responseStatusCode,
        headers: responseHeaders,
    });
}
