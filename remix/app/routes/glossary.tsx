import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { Form, Link, NavLink, Outlet, useLoaderData, useLocation, useSearchParams, useSubmit } from "@remix-run/react";
import { Button, TextField } from "@mui/material";
import { glossaryQuery } from "~/utils/queries/glossary/__generated__/glossaryQuery";
import { GlossaryQuery, GlossarySearchQuery } from "~/utils/queries/glossary";
import { strapi } from "~/utils/strapi.server";
import {
    glossarySearchQuery,
    glossarySearchQuery_glossaryItems_data_attributes,
    glossarySearchQuery_glossaryItems_data_attributes_glossary_categories_data,
} from "~/utils/queries/glossary/__generated__/glossarySearchQuery";
import { useEffect, useState } from "react";

type MappedWords = { [key: string]: glossarySearchQuery_glossaryItems_data_attributes[] };

export const loader: LoaderFunction = async ({ request, context, params }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("s");
    let strapiData: glossarySearchQuery | glossaryQuery;
    if (query) {
        strapiData = (
            await strapi.query<glossarySearchQuery>({
                query: GlossarySearchQuery,
                variables: { s: query },
            })
        ).data;
    } else {
        strapiData = (
            await strapi.query<glossaryQuery>({
                query: GlossaryQuery,
            })
        ).data;
    }

    //parse this in a way that's easy to display to the user
    const parsed: MappedWords = {};
    strapiData.glossaryItems?.data.forEach((n) => {
        if (n.attributes) {
            if (parsed[n.attributes.English.toLowerCase()]) {
                parsed[n.attributes.English.toLowerCase()].push(n.attributes);
            } else {
                parsed[n.attributes.English.toLowerCase()] = [n.attributes];
            }
        }
    });

    return parsed;
};

export default function Index() {
    const data = useLoaderData<MappedWords>();
    const submit = useSubmit();
    const location = useLocation();

    return (
        <div className="container mx-auto my-2">
            <div className="grid grid-cols-12">
                <div className="col-span-2">
                    <Form method="get" onChange={(e) => submit(e.currentTarget)} action="?">
                        <TextField label="Search" variant="outlined" name="s" />
                    </Form>
                    {Object.keys(data).map((n) => {
                        return (
                            <ul>
                                <NavLink to={{pathname: `/glossary/${n}`, search: location.search}} className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}>
                                    {n}
                                </NavLink>
                            </ul>
                        );
                    })}
                </div>
                <div className="col-span-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
