import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";

import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { useState } from "react";
//@ts-ignore
import theme from "./utils/theme";
import { ConfirmContextProvider } from "./utils/context/ConfirmContext";

interface ClientCacheProviderProps {
    children: React.ReactNode;
}

hydrate(
    <ThemeProvider theme={theme}>
        <ConfirmContextProvider>
            <RemixBrowser />
        </ConfirmContextProvider>
    </ThemeProvider>,
    document
);
