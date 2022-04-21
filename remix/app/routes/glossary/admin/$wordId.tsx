import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { Form, NavLink, Outlet, ThrownResponse, useLoaderData, useSubmit } from "@remix-run/react";
import { EnglishWord, EnglishDefinition, MichifWord, PartOfSpeech, ExampleSentence } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Autocomplete, Button, Card, CardContent, CardHeader, Paper, TextField } from "@mui/material";
import newWord from "./new";
import { useConfirmDialog } from "~/utils/context/ConfirmContext";

type EnglishWordExt = EnglishWord & {
    definitions: (Partial<EnglishDefinition> & {
        MichifWords: (Partial<MichifWord> & {
            ExampleSentences?: ExampleSentence[];
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
    console.log(body);

    const action = body.get("action");
    if (action && action === "DELETE") {
        const id = body.get("id");
        const data = body.get("json");
        if (data && typeof data === "string") {
            const word: EnglishWordExt = JSON.parse(data);
            await prisma.englishWord.delete({ where: { id: word.id } });
        }
        return redirect("/glossary/admin");
    }

    // TODO: Verify input

    const data = body.get("json");
    if (data && typeof data === "string") {
        const word: EnglishWordExt = JSON.parse(data);

        for (const definition of word.definitions) {
            let definitionId = definition.id;
            if (definitionId) {
                await prisma.englishDefinition.update({
                    data: {
                        definition: definition.definition,
                    },
                    where: {
                        id: definitionId,
                    },
                });
            } else {
                let createdDefinition = await prisma.englishDefinition.create({
                    data: {
                        definition: definition.definition || "",
                        englishWordId: word.id,
                        //TODO: Update this to allow user input
                        partOfSpeech: PartOfSpeech.Noun,
                    },
                });
                definitionId = createdDefinition.id;
            }

            for (const michif of definition.MichifWords) {
                if (michif.id) {
                    const d = await prisma.michifWord.update({
                        data: {
                            Word: michif.Word,
                            alternateSpellings: michif.alternateSpellings,
                            phonetic: michif.phonetic,
                            EnglishTranslations: {
                                connect: {
                                    id: definitionId,
                                },
                            },
                        },
                        where: {
                            id: michif.id,
                        },
                    });
                } else {
                    const d = await prisma.michifWord.create({
                        data: {
                            Word: michif.Word || "",
                            alternateSpellings: michif.alternateSpellings,
                            phonetic: michif.phonetic,
                            EnglishTranslations: {
                                connect: {
                                    id: definitionId,
                                },
                            },
                        },
                    });
                }
            }
        }

        const newData = await prisma.englishWord.update({
            data: {
                word: word.word,
            },
            where: {
                id: parseInt(params.wordId as string),
            },
        });
        return null;
    }

    return null;
};

export default function Index() {
    const m_englishWord = useLoaderData<EnglishWordExt>();
    const [englishWord, setEnglishWord] = useState<EnglishWordExt>();
    const prompt = useConfirmDialog();
    const submit = useSubmit();

    const handleMichifWordChanged = (michif: Partial<MichifWord>, definitionIndex: number) => {
        const d: EnglishWordExt = JSON.parse(JSON.stringify(englishWord));
        d.definitions[definitionIndex].MichifWords[0] = michif;
        setEnglishWord(d);
    };

    const handleDefinitionChaned = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, definitionIndex: number) => {
        const d: EnglishWordExt = JSON.parse(JSON.stringify(englishWord));
        d.definitions[definitionIndex].definition = event.target.value;
        setEnglishWord(d);
    };

    const handleAddDefinition = () => {
        const d: EnglishWordExt = JSON.parse(JSON.stringify(englishWord));
        d.definitions.push({ MichifWords: [{ Word: "", alternateSpellings: "", phonetic: "" }] });
        setEnglishWord(d);
    };

    const handleDeleteWord = (event: React.MouseEvent<HTMLButtonElement>) => {
        const t = event.currentTarget;
        prompt("Are you sure?", `You're about to permanently delete the word ${englishWord?.word}.`, () => {
            submit(t);
        });
        event.preventDefault();
    };

    useEffect(() => {
        setEnglishWord({ ...m_englishWord });
    }, [m_englishWord]);

    return (
        <div className="container mx-auto mt-8 relative">
            {englishWord && (
                <>
                    <Form method="post">
                        <Button variant="outlined" color="error" name="action" value="DELETE" onClick={handleDeleteWord}>
                            Delete Word
                        </Button>
                        <div className="max-w-xs flex flex-col">
                            <TextField
                                variant="outlined"
                                name="english"
                                id="english"
                                value={englishWord?.word}
                                onChange={(e) => setEnglishWord({ ...englishWord, word: e.target.value })}
                                label="English Word"
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <h3>Definitions</h3>
                        {englishWord?.definitions.map((d, definitionIndex) => (
                            <div className="p-2  rounded-md border-[1px] border-primary-500/30 max-w-md my-3">
                                <TextField
                                    variant="outlined"
                                    value={d.definition || ""}
                                    onChange={(e) => handleDefinitionChaned(e, definitionIndex)}
                                    label="English Definition"
                                    fullWidth
                                    margin="normal"
                                />
                                <h4 className="underline">Michif Translation</h4>
                                <TextField
                                    variant="outlined"
                                    value={d.MichifWords[0].Word || ""}
                                    onChange={(e) => handleMichifWordChanged({ ...d.MichifWords[0], Word: e.target.value }, definitionIndex)}
                                    label="Michif"
                                    fullWidth
                                    margin="dense"
                                />
                                <TextField
                                    variant="outlined"
                                    value={d.MichifWords[0].alternateSpellings || ""}
                                    onChange={(e) => handleMichifWordChanged({ ...d.MichifWords[0], alternateSpellings: e.target.value }, definitionIndex)}
                                    label="Alternate Spellings"
                                    fullWidth
                                    margin="dense"
                                />
                                <TextField
                                    variant="outlined"
                                    value={d.MichifWords[0].phonetic || ""}
                                    onChange={(e) => handleMichifWordChanged({ ...d.MichifWords[0], phonetic: e.target.value }, definitionIndex)}
                                    label="Phonetic"
                                    fullWidth
                                    margin="dense"
                                />
                            </div>
                        ))}
                        <input type="hidden" value={JSON.stringify(englishWord)} name="json" />
                        <Button variant="outlined" onClick={handleAddDefinition}>
                            Add Definition
                        </Button>
                        <button type="submit" className="btn-primary">
                            Save
                        </button>
                    </Form>
                </>
            )}
        </div>
    );
}
