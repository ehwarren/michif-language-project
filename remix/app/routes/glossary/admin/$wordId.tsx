import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { Form, NavLink, Outlet, ThrownResponse, useLoaderData } from "@remix-run/react";
import { EnglishWord, EnglishDefinition, MichifWord, PartOfSpeech, ExampleSentence } from "@prisma/client";
import { useEffect, useState } from "react";

type Word = (EnglishWord & {
    definitions: (EnglishDefinition & {
        MichifWords: (MichifWord & {
            ExampleSentences: MichifWord[];
        })[];
    })[];
})[];

type EnglishWordExt = EnglishWord & {
    definitions: (EnglishDefinition & {
        MichifWords: (MichifWord & {
            ExampleSentences: ExampleSentence[];
        })[];
    })[];
};

export type WordNotFoundResponse = ThrownResponse<404, string>;

export const loader: LoaderFunction = async ({ params }): Promise<EnglishWordExt> => {
    const wordId = params.wordId && parseInt(params.wordId);
    if (wordId) {
        const word = await prisma.englishWord.findUnique({
            where: { id: wordId },
            include: { definitions: { include: { MichifWords: { include: { ExampleSentences: true } } } } },
        });
        if (!word) {
            throw json("Word not found", { status: 404 });
        }
        return word;
    }
    throw json("Word not found", { status: 404 });
};

export const action: ActionFunction = async ({ request, params }) => {
    const body = await request.formData();
    // TODO: Verify input

    const english = body.get("english");
    const definition = body.get("definition");
    const definitionId = body.get("definitionId");
    const michif = body.get("michif");
    

    if (typeof english !== "string" || typeof definition !== "string" || typeof michif !== "string" || typeof definitionId !== "string") {
        return json({ formError: "Form missing data..." });
    }

    console.log(
        JSON.stringify({
            data: {
                word: english,
                definitions: {
                    update: {
                        data: {
                            definition,
                        },
                        where: {
                            id: parseInt(definitionId),
                        },
                    },
                },
            },
            where: {
                id: parseInt(params.wordId as string),
            },
        })
    );

    //update the word.

    const newData = await prisma.englishWord.update({
        data: {
            word: english,
            definitions: {
                update: {
                    data: {
                        definition,
                    },
                    where: {
                        id: parseInt(definitionId),
                    },
                },
            },
        },
        where: {
            id: parseInt(params.wordId as string),
        },
    });
    return null;
};

export default function Index() {
    const m_englishWord = useLoaderData<EnglishWordExt>();
    const [englishWord, setEnglishWord] = useState<EnglishWordExt>();

    useEffect(() => {
        setEnglishWord({ ...m_englishWord });
    }, [m_englishWord]);

    return (
        <div className="container mx-auto mt-8">
            {englishWord && (
                <Form method="post">
                    <div className="max-w-xs flex flex-col">
                        <label htmlFor="english">English Word</label>
                        <input
                            name="english"
                            type="text"
                            id="english"
                            value={englishWord?.word}
                            onChange={(e) => setEnglishWord({ ...englishWord, word: e.target.value })}
                        />
                    </div>
                    <div className="max-w-xs flex flex-col">
                        <label htmlFor="definition">English Definition</label>
                        <textarea
                            name="definition"
                            id="definition"
                            value={englishWord?.definitions[0].definition}
                            onChange={(e) => setEnglishWord({ ...englishWord, definitions: [{ ...englishWord.definitions[0], definition: e.target.value }] })}
                        ></textarea>
                    </div>
                    <div className="max-w-xs flex flex-col">
                        <label htmlFor="michif">Michif</label>
                        <input
                            name="michif"
                            id="michif"
                            value={englishWord?.definitions[0].MichifWords[0].Word}
                            onChange={(e) =>
                                setEnglishWord({
                                    ...englishWord,
                                    definitions: [
                                        {
                                            ...englishWord.definitions[0],
                                            MichifWords: [{ ...englishWord.definitions[0].MichifWords[0], Word: e.target.value }],
                                        },
                                    ],
                                })
                            }
                        ></input>
                    </div>
                    <input type="hidden" value={englishWord.definitions[0].id} name="definitionId"/>
                    <button type="submit" className="btn-primary">
                        Save
                    </button>
                </Form>
            )}
        </div>
    );
}
