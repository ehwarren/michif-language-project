import { PartOfSpeech, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const category = await prisma.category.upsert({
        where: { title: "People" },
        update: {},
        create: {
            title: "People",
        },
    });

    const girl = await prisma.englishWord.upsert({
        where: { word: "girl" },
        update: {},
        create: {
            word: "girl",
            MichifWords: {
                create: {
                    word: "fiiy",
                    exampleSentenceEnglish: "The girl is talking.",
                    exampleSentenceMichif: "En zhen fiiy ni-waapamaanaan.",
                    phonetic: "fij",
                    PartOfSpeech: PartOfSpeech.Noun,
                    Categories: {
                        connect: {
                            id: category.id,
                        },
                    },
                },
            },
        },
    });

    const boy = await prisma.englishWord.upsert({
        where: { word: "boy" },
        update: {},
        create: {
            word: "boy",
            MichifWords: {
                create: {
                    word: "garsoñ",
                    exampleSentenceEnglish: "This is my son.",
                    exampleSentenceMichif: "Moñ garsoñ awa.",
                    phonetic: "fij",
                    PartOfSpeech: PartOfSpeech.Noun,
                    Categories: {
                        connect: {
                            id: category.id,
                        },
                    },
                },
            },
            RelatedWords: {
                connect: [{ id: girl.id }],
            },
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
