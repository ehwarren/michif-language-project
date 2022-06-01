import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { Form, NavLink, Outlet, ThrownResponse, useLoaderData, useMatches, useSubmit } from "@remix-run/react";
import { Category, EnglishWord, MichifWord, PartOfSpeech } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Autocomplete, Button, Card, CardContent, CardHeader, createFilterOptions, MenuItem, Paper, TextField } from "@mui/material";
import newWord from "./new";
import { useConfirmDialog } from "~/utils/context/ConfirmContext";
import { useMichifWords } from "~/utils/context/MichifWordContext";
import { CasinoSharp } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";

type MichifWordExt = MichifWord & {
    Categories?: Category[];
};

type EnglishWordExt = EnglishWord & {
    RelatedWords: EnglishWord[];
    WordsRelatedTo: EnglishWord[];
    MichifWords: Partial<MichifWordExt>[];
};

export type WordNotFoundResponse = ThrownResponse<404, string>;

type WordData = {
    englishWord: EnglishWordExt;
};

const filter = createFilterOptions<Category & { inputValue?: string }>();

export const loader: LoaderFunction = async ({ params, context, request }): Promise<WordData> => {
    const wordId = params.wordId && parseInt(params.wordId);
    if (wordId) {
        const word = await prisma.englishWord.findUnique({
            where: { id: wordId },
            include: {
                RelatedWords: true,
                WordsRelatedTo: true,
                MichifWords: {
                    include: {
                        Categories: true,
                    },
                },
            },
        });
        if (!word) {
            throw json("Word not found", { status: 404 });
        }
        return {
            englishWord: word,
        };
    }
    throw json("Word not found", { status: 404 });
};

export const action: ActionFunction = async ({ request, params }) => {
    const body = await request.formData();

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

        for (const michif of word.MichifWords) {
            // Lets create any categories that are selected but don't exist yet
            if (michif.id) {
                //clear all related categories so we can update them below
                const cleared = await prisma.michifWord.update({
                    data: {
                        Categories: {
                            set: [],
                        },
                    },
                    where: {
                        id: michif.id,
                    },
                });
                const d = await prisma.michifWord.update({
                    data: {
                        word: michif.word,
                        PartOfSpeech: michif.PartOfSpeech,
                        exampleSentenceEnglish: michif.exampleSentenceEnglish || "",
                        exampleSentenceMichif: michif.exampleSentenceMichif || "",
                        phonetic: michif.phonetic || "",
                        soundDate: michif.soundDate,
                        soundLocation: michif.soundLocation,
                        soundEmbedUrl: michif.soundEmbedUrl,
                        soundSpeaker: michif.soundSpeaker,
                        Categories: {
                            connectOrCreate: michif.Categories?.map((n) => ({
                                where: {
                                    title: n.title,
                                },
                                create: {
                                    title: n.title,
                                },
                            })),
                        },
                    },
                    where: {
                        id: michif.id,
                    },
                });
            } else {
                const d = await prisma.michifWord.create({
                    data: {
                        word: michif.word || "",
                        phonetic: michif.phonetic || "",
                        PartOfSpeech: michif.PartOfSpeech || PartOfSpeech.Noun,
                        exampleSentenceEnglish: michif.exampleSentenceEnglish || "",
                        exampleSentenceMichif: michif.exampleSentenceMichif || "",
                        EnglishWord: {
                            connect: {
                                id: word.id,
                            },
                        },
                        Categories: {
                            connectOrCreate: michif.Categories?.map((n) => ({
                                where: {
                                    title: n.title,
                                },
                                create: {
                                    title: n.title,
                                },
                            })),
                        },
                    },
                });
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
    const wordData = useLoaderData<WordData>();
    const [englishWord, setEnglishWord] = useState<EnglishWordExt>();
    const prompt = useConfirmDialog();
    const submit = useSubmit();
    const matches = useMatches();

    const [englishWords, setEnglishWords] = useState<EnglishWord[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const baseData = matches.filter((n) => n.id === "routes/glossary/admin")[0].data;
        setEnglishWords(baseData.englishWords);
        setCategories(baseData.categories);
    }, [matches]);

    const handleMichifWordChanged = (michif: Partial<MichifWordExt>, translationIndex: number) => {
        const d: EnglishWordExt = JSON.parse(JSON.stringify(englishWord));
        d.MichifWords[translationIndex] = michif;
        setEnglishWord(d);
    };

    const handleAddTranslation = () => {
        const d: EnglishWordExt = JSON.parse(JSON.stringify(englishWord));
        d.MichifWords.push({ word: "", phonetic: "" });
        setEnglishWord(d);
    };

    const handleDeleteWord = (event: React.MouseEvent<HTMLButtonElement>) => {
        const t = event.currentTarget;
        prompt("Are you sure?", `You're about to permanently delete the word ${englishWord?.word}.`, () => {
            submit(t);
        });
        event.preventDefault();
    };

    const handleRelatedWordsChanged = (relatedWords: EnglishWord[]) => {
        const d: EnglishWordExt = JSON.parse(JSON.stringify(englishWord));
        d.RelatedWords = relatedWords;
        setEnglishWord(d);
    };

    useEffect(() => {
        setEnglishWord({ ...wordData.englishWord });
    }, [wordData.englishWord]);

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
                                onChange={(e) =>
                                    setEnglishWord({
                                        ...englishWord,
                                        word: e.target.value,
                                    })
                                }
                                label="English Word"
                                fullWidth
                                margin="dense"
                            />
                            <Autocomplete
                                value={englishWord.RelatedWords || []}
                                multiple
                                options={englishWords}
                                getOptionLabel={(n) => n.word}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField {...params} label="Related Words" variant="outlined" margin="dense" />}
                                onChange={(event, value, reason) => {
                                    handleRelatedWordsChanged(value);
                                }}
                            />
                            {/* <Autocomplete
                                value={englishWord.WordsRelatedTo || []}
                                multiple
                                options={englishWords}
                                getOptionLabel={(n) => n.word}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField {...params} label="Words Related To" variant="outlined" margin="dense" />}
                                disabled
                            /> */}
                        </div>
                        <h3>Translations</h3>
                        {englishWord?.MichifWords.map((d, translationIndex) => (
                            <div className="p-2 rounded-md border-[1px] container border-secondary-700/30 my-3 bg-primary-500/10" key={d.id}>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            value={d.word || ""}
                                            onChange={(e) =>
                                                handleMichifWordChanged(
                                                    {
                                                        ...d,
                                                        word: e.target.value,
                                                    },
                                                    translationIndex
                                                )
                                            }
                                            label="Michif Translation"
                                            fullWidth
                                            margin="dense"
                                        />
                                        <TextField
                                            variant="outlined"
                                            value={d.PartOfSpeech}
                                            onChange={(e) =>
                                                handleMichifWordChanged(
                                                    {
                                                        ...d,
                                                        PartOfSpeech: e.target.value as PartOfSpeech,
                                                    },
                                                    translationIndex
                                                )
                                            }
                                            label="Part of Speech"
                                            fullWidth
                                            margin="dense"
                                            select
                                        >
                                            {Object.keys(PartOfSpeech).map((n) => (
                                                <MenuItem key={n} value={n}>
                                                    {n}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            variant="outlined"
                                            value={d.phonetic || ""}
                                            onChange={(e) =>
                                                handleMichifWordChanged(
                                                    {
                                                        ...d,
                                                        phonetic: e.target.value,
                                                    },
                                                    translationIndex
                                                )
                                            }
                                            label="Phonetic"
                                            fullWidth
                                            margin="dense"
                                        />
                                        <Autocomplete
                                            value={d.Categories || []}
                                            multiple
                                            options={categories}
                                            getOptionLabel={(n) => {
                                                if (typeof n === "string") {
                                                    return n;
                                                }
                                                return n.title;
                                            }}
                                            isOptionEqualToValue={(option, value) => option.title === value.title}
                                            renderInput={(params) => <TextField {...params} label="Categories" variant="outlined" margin="dense" />}
                                            freeSolo
                                            filterOptions={(options, params) => {
                                                const filtered = filter(options, params);

                                                const { inputValue } = params;
                                                const isExisting = options.some((option) => inputValue === option.title);
                                                if (inputValue !== "" && !isExisting) {
                                                    filtered.push({
                                                        id: -1,
                                                        title: `Create "${inputValue}"`,
                                                        inputValue,
                                                    });
                                                }

                                                return filtered;
                                            }}
                                            onChange={(event, value, reason) => {
                                                if (typeof value === "string") {
                                                    handleMichifWordChanged(
                                                        {
                                                            ...d,
                                                            Categories: [{ id: -1, title: value }],
                                                        },
                                                        translationIndex
                                                    );
                                                } else {
                                                    const parsed = value.map((n) => {
                                                        if (typeof n === "string") {
                                                            return { id: -1, title: n };
                                                            //@ts-ignore
                                                        } else if (n.inputValue) {
                                                            //@ts-ignore
                                                            return { id: -1, title: n.inputValue };
                                                        } else {
                                                            return n;
                                                        }
                                                    });
                                                    handleMichifWordChanged(
                                                        {
                                                            ...d,
                                                            Categories: parsed,
                                                        },
                                                        translationIndex
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            value={d.soundEmbedUrl || ""}
                                            onChange={(e) =>
                                                handleMichifWordChanged(
                                                    {
                                                        ...d,
                                                        soundEmbedUrl: e.target.value,
                                                    },
                                                    translationIndex
                                                )
                                            }
                                            label="Sound Embed URL"
                                            fullWidth
                                            margin="dense"
                                        />
                                        <TextField
                                            variant="outlined"
                                            value={d.soundSpeaker || ""}
                                            onChange={(e) =>
                                                handleMichifWordChanged(
                                                    {
                                                        ...d,
                                                        soundSpeaker: e.target.value,
                                                    },
                                                    translationIndex
                                                )
                                            }
                                            label="Sound Speaker"
                                            fullWidth
                                            margin="dense"
                                        />
                                        <TextField
                                            variant="outlined"
                                            value={d.soundLocation || ""}
                                            onChange={(e) =>
                                                handleMichifWordChanged(
                                                    {
                                                        ...d,
                                                        soundLocation: e.target.value,
                                                    },
                                                    translationIndex
                                                )
                                            }
                                            label="Sound Location"
                                            fullWidth
                                            margin="dense"
                                        />
                                        <DatePicker
                                            label="Sound Date"
                                            value={d.soundDate}
                                            onChange={(newValue) =>
                                                handleMichifWordChanged(
                                                    {
                                                        ...d,
                                                        soundDate: newValue,
                                                    },
                                                    translationIndex
                                                )
                                            }
                                            renderInput={(params) => <TextField {...params} margin="dense" fullWidth />}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <h4 className="underline">Example Use</h4>
                                        <TextField
                                            variant="outlined"
                                            value={d.exampleSentenceEnglish || ""}
                                            onChange={(e) =>
                                                handleMichifWordChanged(
                                                    {
                                                        ...d,
                                                        exampleSentenceEnglish: e.target.value,
                                                    },
                                                    translationIndex
                                                )
                                            }
                                            label="English"
                                            fullWidth
                                            margin="dense"
                                        />
                                        <TextField
                                            variant="outlined"
                                            value={d.exampleSentenceMichif || ""}
                                            onChange={(e) =>
                                                handleMichifWordChanged(
                                                    {
                                                        ...d,
                                                        exampleSentenceMichif: e.target.value,
                                                    },
                                                    translationIndex
                                                )
                                            }
                                            label="Michif"
                                            fullWidth
                                            margin="dense"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <input type="hidden" value={JSON.stringify(englishWord)} name="json" />
                        <Button variant="outlined" onClick={handleAddTranslation}>
                            Add Translation
                        </Button>
                        <Button type="submit" variant="outlined">
                            Save
                        </Button>
                    </Form>
                </>
            )}
        </div>
    );
}
