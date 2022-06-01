import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { useLoaderData } from "@remix-run/react";
import { EnglishWord, MichifWord } from "@prisma/client";
import { Button } from "@mui/material";

type Word = (EnglishWord & {
    RelatedWords: EnglishWord[];
    MichifWords: MichifWord[];
})[];

export const loader: LoaderFunction = async () => {
    const data = await prisma.englishWord.findMany({
        include: {
            RelatedWords: true,
            MichifWords: true,
        },
    });
    return data;
};

export default function Index() {
    const data = useLoaderData<Word>();
    return (
        <div className="container mx-auto">
            <Button variant="outlined">We hhave a buton</Button>
            {data.map((n) => (
                <div key={n.id}>
                    <h2>{n.word}</h2>
                    {n.MichifWords.map((d) => (
                        <div key={d.id}>
                            <small>{d.PartOfSpeech}</small>
                            <p>{d.exampleSentenceEnglish}</p>
                            <p>{d.exampleSentenceMichif}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
