/*
  Warnings:

  - Added the required column `definition` to the `EnglishDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnglishDefinition" ADD COLUMN     "definition" TEXT NOT NULL;
