/*
  Warnings:

  - You are about to drop the `Sound` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryTeller` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sound" DROP CONSTRAINT "Sound_michifWordId_fkey";

-- DropForeignKey
ALTER TABLE "Sound" DROP CONSTRAINT "Sound_storyTellerId_fkey";

-- AlterTable
ALTER TABLE "MichifWord" ADD COLUMN     "soundDate" TIMESTAMP(3),
ADD COLUMN     "soundEmbedUrl" TEXT,
ADD COLUMN     "soundLocation" TEXT,
ADD COLUMN     "soundSpeaker" TEXT;

-- DropTable
DROP TABLE "Sound";

-- DropTable
DROP TABLE "StoryTeller";
