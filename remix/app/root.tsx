import type { MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData } from "@remix-run/react";
import { strapi } from "~/utils/strapi.server";
import Navbar from "~/components/navbar";

import styles from "~/tailwind.css";
import { RootQuery } from "./utils/queries/rootQuery";
import { useState } from "react";
import { CatchBoundaryComponent } from "@remix-run/react/routeModules";
import { rootQuery, rootQuery_mainMenu_data_attributes } from "./utils/queries/rootQuery/__generated__/rootQuery";
import Footer from "~/components/footer";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

export function links() {
    return [
        { rel: "stylesheet", href: styles },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#0d4c9d" },
    ];
}

export const meta: MetaFunction = ({ data }: { data: rootQuery }) => {
    return {
        charset: "utf-8",
        title: data.siteAsset?.data?.attributes?.seo?.metaTitle,
        description: data.siteAsset?.data?.attributes?.seo?.metaDescription,
        "og:image": data.siteAsset?.data?.attributes?.seo?.metaImage.data?.attributes?.url,
        viewport: "width=device-width,initial-scale=1",
    };
};

export async function loader() {
    const rootData = await strapi.query<rootQuery>({
        query: RootQuery,
    });

    return rootData.data;
}

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    const { mainMenu, footer, siteAsset } = useLoaderData<rootQuery>();

    const handleMenuToggled = (isOpen: boolean) => {
        setMenuOpen(isOpen);
    };
    return (
        <html lang="en" className="scroll-smooth scroll-p-16 md:scroll-p-24">
            <head>
                <Meta />
                <Links />
            </head>
            <body className={`bg-neutral-200 pt-16 md:pt-24 min-h-screen flex flex-col ${menuOpen ? "h-[100vh] w-full overflow-hidden" : ""}`}>
                <Navbar
                    navItems={mainMenu?.data?.attributes?.Link || []}
                    onMenuToggle={handleMenuToggled}
                    logo={siteAsset?.data?.attributes?.Logo?.data?.attributes || undefined}
                />
                <div className="flex-grow flex">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Outlet />
                    </LocalizationProvider>
                </div>
                {footer && <Footer data={footer} />}
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
