import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { Button } from "@mui/material";
import { glossarySearchQuery, glossarySearchQueryVariables } from "~/utils/queries/glossary/__generated__/glossarySearchQuery";
import { GlossarySearchQuery } from "~/utils/queries/glossary";
import { strapi } from "~/utils/strapi.server";
import {
    glossarySearchQuery_glossaryItems_data_attributes,
    glossarySearchQuery_glossaryItems_data_attributes_glossary_categories_data,
} from "~/utils/queries/glossary/__generated__/glossarySearchQuery";
import { useEffect, useState } from "react";

type MappedWords = { [key: string]: glossarySearchQuery_glossaryItems_data_attributes[] };

export const loader: LoaderFunction = async ({ params }) => {
    const strapiData = await strapi.query<glossarySearchQuery, glossarySearchQueryVariables>({
        query: GlossarySearchQuery,
        variables: { s: params.word || "" },
    });

    if (!strapiData.data.glossaryItems?.data.length) {
        throw new Response("Word Not Found", {
            status: 404,
        });
    }

    return strapiData.data;
};

export function CatchBoundary() {
    const params = useParams();
    return (
        <div>
            <h2>We couldn't find that word!</h2>
        </div>
    );
}

export default function Index() {
    const data = useLoaderData<glossarySearchQuery>();
    const params = useParams();
    return (
        <div className="px-3 bg-primary-400/40" key={params["word"]}>
            <h2 className="py-2">{params["word"]}</h2>
            <div className="py-2">
                {data.glossaryItems?.data.map((translation) => (
                    <div className="border-l-2 ml-3 pl-2 my-2" key={translation.attributes?.Michif}>
                        <p className="font-bold flex items-center gap-2">
                            {translation.attributes?.Michif}
                            {translation.attributes?.glossary_categories?.data.map((cat) => (
                                <div key={cat.id} className="p-1 px-3 rounded-full bg-secondary-500 w-fit text-white">
                                    {cat.attributes?.Title}
                                </div>
                            ))}
                        </p>
                        <p>{translation.attributes?.ExampleEnglish}</p>
                        <p>{translation.attributes?.ExampleMichif}</p>
                        {translation.attributes?.glossary_items?.data.length ? (
                            <div className="mt-4 mb-1">
                                <h4>Related Words</h4>
                                {translation.attributes?.glossary_items?.data.map((related) => (
                                    <Link to={`/glossary/${related.attributes?.English}`}>
                                        <div key={related.id} className="p-1 px-3 rounded-full bg-primary-500 w-fit text-white">
                                            {related.attributes?.English}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}
