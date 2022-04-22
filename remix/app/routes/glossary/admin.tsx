import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import {
    EnglishWord,
    EnglishDefinition,
    MichifWord,
    PartOfSpeech,
} from "@prisma/client";

import {
    Button,
} from "@mui/material";

import { MichifWordsContextProvider } from "~/utils/context/MichifWordContext";
import WordSidebar from "~/components/admin/WordSidebar";

type Word = (EnglishWord & {
    definitions: (EnglishDefinition & {
        MichifWords: (MichifWord & {
            ExampleSentences: MichifWord[];
        })[];
    })[];
})[];

type AdminData = {
    englishWords: EnglishWord[];
    michifWords: MichifWord[];
};
export const loader: LoaderFunction = async (): Promise<AdminData> => {
    return {
        englishWords: await prisma.englishWord.findMany({
            orderBy: { word: "asc" },
        }),
        michifWords: await prisma.michifWord.findMany({}),
    };
};

export default function Index() {
    const { englishWords, michifWords } = useLoaderData<AdminData>();


    return (
        <div className="mt-8 flex flex-col w-full">
            <div className="flex justify-between">
                <Link to="/glossary/admin/new">
                    <Button variant="outlined" color="primary">
                        Add Word
                    </Button>
                </Link>
            </div>
            <div className="flex-grow">
                <div className="grid grid-cols-12 h-full">
                    <div className="col-span-2 border-r-primary-500/20 border-[1px]">
                        <WordSidebar englishWords={englishWords} />
                    </div>
                    <div className="col-span-10 ml-4">
                        <MichifWordsContextProvider words={michifWords}>
                            <Outlet />
                        </MichifWordsContextProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}
