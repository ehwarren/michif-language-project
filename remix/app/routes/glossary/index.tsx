import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { useLoaderData } from "@remix-run/react";
import { EnglishWord, MichifWord } from "@prisma/client";
import { Button } from "@mui/material";
import { glossaryQuery } from "~/utils/queries/glossary/__generated__/glossaryQuery";
import { GlossaryQuery } from "~/utils/queries/glossary";
import { strapi } from "~/utils/strapi.server";
import {
    glossarySearchQuery_glossaryItems_data_attributes,
    glossarySearchQuery_glossaryItems_data_attributes_glossary_categories_data,
} from "~/utils/queries/glossary/__generated__/glossarySearchQuery";
import { useEffect, useState } from "react";

type Word = (EnglishWord & {
    RelatedWords: EnglishWord[];
    MichifWords: MichifWord[];
})[];

type MappedWords = { [key: string]: glossarySearchQuery_glossaryItems_data_attributes[] };

export const loader: LoaderFunction = async () => {
    const data = await prisma.englishWord.findMany({
        include: {
            RelatedWords: true,
            MichifWords: true,
        },
    });

    const strapiData = await strapi.query<glossaryQuery>({
        query: GlossaryQuery,
    });

    //parse this in a way that's easy to display to the user
    const parsed: MappedWords = {};
    strapiData.data.glossaryItems?.data.forEach((n) => {
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

    return (
        <div className="container mx-auto">
            {Object.keys(data).map((n) => {
                return (
                    <div className="px-3 bg-primary-400/40 my-2" key={n}>
                        <h2 className="py-2">{n}</h2>
                        <div className="py-2">
                            {data[n].map((translation) => (
                                <div className="border-l-2 ml-3 pl-2 my-2" key={translation.Michif}>
                                    <p className="font-bold flex items-center gap-2">
                                        {translation.Michif}
                                        {translation.glossary_categories?.data.map((cat) => (
                                            <div key={cat.id} className="p-1 px-3 rounded-full bg-secondary-500 w-fit text-white">
                                                {cat.attributes?.Title}
                                            </div>
                                        ))}
                                    </p>
                                    <p>{translation.ExampleEnglish}</p>
                                    <p>{translation.ExampleMichif}</p>
                                    {translation.glossary_items?.data.length ? (
                                        <div className="mt-4 mb-1">
                                            <h4>Related Words</h4>
                                            {translation.glossary_items?.data.map((related) => (
                                                <div key={related.id} className="p-1 px-3 rounded-full bg-primary-500 w-fit text-white">
                                                    {related.attributes?.English}
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
