-- CreateEnum
CREATE TYPE "PartOfSpeech" AS ENUM ('Noun', 'Pronoun', 'Verb');

-- CreateEnum
CREATE TYPE "VariantType" AS ENUM ('Plural', 'Past', 'Present');

-- CreateTable
CREATE TABLE "EnglishWord" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "EnglishWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MichifWord" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "phonetic" TEXT,
    "image" TEXT,
    "ExampleSentence" TEXT,
    "Note" TEXT,
    "registrarId" INTEGER,
    "PartOfSpeech" "PartOfSpeech" NOT NULL,

    CONSTRAINT "MichifWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sound" (
    "id" SERIAL NOT NULL,
    "embedURL" TEXT NOT NULL,
    "storyTellerId" INTEGER NOT NULL,
    "michifWordId" INTEGER,

    CONSTRAINT "Sound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryTeller" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StoryTeller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registrar" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Registrar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RelatedWords" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToMichifWord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EnglishWord_word_key" ON "EnglishWord"("word");

-- CreateIndex
CREATE UNIQUE INDEX "Sound_michifWordId_key" ON "Sound"("michifWordId");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedWords_AB_unique" ON "_RelatedWords"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedWords_B_index" ON "_RelatedWords"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToMichifWord_AB_unique" ON "_CategoryToMichifWord"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToMichifWord_B_index" ON "_CategoryToMichifWord"("B");

-- AddForeignKey
ALTER TABLE "MichifWord" ADD CONSTRAINT "MichifWord_registrarId_fkey" FOREIGN KEY ("registrarId") REFERENCES "Registrar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sound" ADD CONSTRAINT "Sound_michifWordId_fkey" FOREIGN KEY ("michifWordId") REFERENCES "MichifWord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sound" ADD CONSTRAINT "Sound_storyTellerId_fkey" FOREIGN KEY ("storyTellerId") REFERENCES "StoryTeller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedWords" ADD CONSTRAINT "_RelatedWords_A_fkey" FOREIGN KEY ("A") REFERENCES "EnglishWord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedWords" ADD CONSTRAINT "_RelatedWords_B_fkey" FOREIGN KEY ("B") REFERENCES "EnglishWord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMichifWord" ADD CONSTRAINT "_CategoryToMichifWord_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMichifWord" ADD CONSTRAINT "_CategoryToMichifWord_B_fkey" FOREIGN KEY ("B") REFERENCES "MichifWord"("id") ON DELETE CASCADE ON UPDATE CASCADE;
