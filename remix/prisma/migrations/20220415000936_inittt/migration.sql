/*
  Warnings:

  - Added the required column `Word` to the `MichifWord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MichifWord" ADD COLUMN     "Word" TEXT NOT NULL;
