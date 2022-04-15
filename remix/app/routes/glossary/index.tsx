import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { useLoaderData } from "@remix-run/react"
import { EnglishWord, EnglishDefinition, MichifWord } from "@prisma/client";


type Word = (EnglishWord & {
    definitions: (EnglishDefinition & {
        MichifWords: (MichifWord & {
            ExampleSentences: MichifWord[];
        })[];
    })[];
})[];

export const loader: LoaderFunction = async () => {
    const data = await prisma.englishWord.findMany({
        include: {
            definitions: {
                include: {
                    MichifWords: {
                        include: {
                            ExampleSentences: true
                        }
                    }
                }
            }
        }
    })
    return data;
}

export default function Index() {
    const data = useLoaderData<Word>();
    console.log(data);
    return (
        <div>
            {data.map(n => (
                <div key={n.id}>
                    <h2>{n.word}</h2>
                    {n.definitions.map(d => (
                        <div key={d.id}>
                            <small>{d.partOfSpeech}</small>
                            {d.MichifWords.map(mw => (
                                <div>
                                    <small>
                                        <strong>{mw.Word}</strong>
                                    </small>
                                </div>
                            ))}
                            <p>{d.definition}</p>
                        </div>
                    ))}
                </div>
            ))
            }
        </div>
    );
}
