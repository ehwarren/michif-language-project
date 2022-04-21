import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { Form, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { EnglishWord, EnglishDefinition, MichifWord, PartOfSpeech } from "@prisma/client";

import { Button } from "@mui/material";

type Word = (EnglishWord & {
    definitions: (EnglishDefinition & {
        MichifWords: (MichifWord & {
            ExampleSentences: MichifWord[];
        })[];
    })[];
})[];

export const loader: LoaderFunction = async () => {
    return await prisma.englishWord.findMany({});
};

export const action: ActionFunction = async ({ request }) => {
    const body = await request.formData();
    console.log(body);
    const english = body.get("english");
    const definition = body.get("definition");
    const michif = body.get("michif");

    if (typeof english !== "string" || typeof definition !== "string" || typeof michif !== "string") {
        return json({ formError: "Form missing data..." });
    }

    const word = await prisma.englishWord.create({
        data: {
            word: english,
            definitions: {
                create: {
                    definition,
                    partOfSpeech: PartOfSpeech.Noun,
                    MichifWords: {
                        create: {
                            Word: michif,
                        },
                    },
                },
            },
        },
    });

    return null;
};

export default function Index() {
    const englishWords = useLoaderData<EnglishWord[]>();
    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between">
                <h2>Welcome to glossary admin</h2>
                <Button variant="outlined" color="primary">
                    Add Word
                </Button>
            </div>

            <div className="grid grid-cols-12">
                <ul className="col-span-2">
                    {englishWords.map((n) => (
                        <li key={n.id}>
                            <NavLink to={`/glossary/admin/${n.id}`}>{n.word}</NavLink>
                        </li>
                    ))}
                </ul>
                <div className="col-span-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
