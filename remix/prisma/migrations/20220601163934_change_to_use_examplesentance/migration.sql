/*
  Warnings:

  - You are about to drop the column `ExampleSentence` on the `MichifWord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MichifWord" DROP COLUMN "ExampleSentence",
ADD COLUMN     "exampleSentenceEnglish" TEXT,
ADD COLUMN     "exampleSentenceMichif" TEXT;
