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
CREATE TABLE "EnglishDefinition" (
    "id" SERIAL NOT NULL,
    "partOfSpeech" "PartOfSpeech" NOT NULL,
    "englishWordId" INTEGER NOT NULL,

    CONSTRAINT "EnglishDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "type" "VariantType" NOT NULL,
    "variant" TEXT NOT NULL,
    "michifWordId" INTEGER,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MichifWord" (
    "id" SERIAL NOT NULL,
    "alternateSpellings" TEXT,
    "phonetic" TEXT,
    "image" TEXT,

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
CREATE TABLE "ExampleSentence" (
    "id" SERIAL NOT NULL,
    "michif" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "michifWordId" INTEGER,

    CONSTRAINT "ExampleSentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EnglishDefinitionToMichifWord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
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
CREATE UNIQUE INDEX "_EnglishDefinitionToMichifWord_AB_unique" ON "_EnglishDefinitionToMichifWord"("A", "B");

-- CreateIndex
CREATE INDEX "_EnglishDefinitionToMichifWord_B_index" ON "_EnglishDefinitionToMichifWord"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedWords_AB_unique" ON "_RelatedWords"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedWords_B_index" ON "_RelatedWords"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToMichifWord_AB_unique" ON "_CategoryToMichifWord"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToMichifWord_B_index" ON "_CategoryToMichifWord"("B");

-- AddForeignKey
ALTER TABLE "EnglishDefinition" ADD CONSTRAINT "EnglishDefinition_englishWordId_fkey" FOREIGN KEY ("englishWordId") REFERENCES "EnglishWord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_michifWordId_fkey" FOREIGN KEY ("michifWordId") REFERENCES "MichifWord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sound" ADD CONSTRAINT "Sound_michifWordId_fkey" FOREIGN KEY ("michifWordId") REFERENCES "MichifWord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sound" ADD CONSTRAINT "Sound_storyTellerId_fkey" FOREIGN KEY ("storyTellerId") REFERENCES "StoryTeller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExampleSentence" ADD CONSTRAINT "ExampleSentence_michifWordId_fkey" FOREIGN KEY ("michifWordId") REFERENCES "MichifWord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnglishDefinitionToMichifWord" ADD FOREIGN KEY ("A") REFERENCES "EnglishDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnglishDefinitionToMichifWord" ADD FOREIGN KEY ("B") REFERENCES "MichifWord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedWords" ADD FOREIGN KEY ("A") REFERENCES "MichifWord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedWords" ADD FOREIGN KEY ("B") REFERENCES "MichifWord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMichifWord" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMichifWord" ADD FOREIGN KEY ("B") REFERENCES "MichifWord"("id") ON DELETE CASCADE ON UPDATE CASCADE;
