import type { LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { homePageQuery, homePageQuery_homePage_data_attributes } from "~/utils/queries/homePage/__generated__/homePageQuery";
import { HomePageQuery } from "../utils/queries/homePage";
import { strapi } from "../utils/strapi.server";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = ({ data, params }) => {
    const { seo } = data as homePageQuery_homePage_data_attributes;
    return {
        title: seo?.metaTitle,
        description: seo?.metaDescription,
        "og:image": seo?.metaImage.data?.attributes?.url,
    };
};

import Hero from "../components/hero";
import ResponsiveImage, { Image } from "~/components/image";
import Form from "~/components/form";
import { formsQuery_forms_data } from "~/utils/queries/forms/__generated__/formsQuery";
import { CatchBoundaryComponent } from "@remix-run/react/routeModules";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const data = await strapi.query<homePageQuery>({
        query: HomePageQuery,
        variables: {
            s: url.searchParams.get("s") || "",
        },
        fetchPolicy: "no-cache",
    });
    return data.data.homePage?.data?.attributes || {};
};

export default function Index() {
    const data = useLoaderData<homePageQuery_homePage_data_attributes>();
    return (
        <div>
            Home page data
        </div>
    );
}
