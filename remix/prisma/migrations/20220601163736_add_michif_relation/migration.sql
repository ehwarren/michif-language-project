-- AlterTable
ALTER TABLE "MichifWord" ADD COLUMN     "englishWordId" INTEGER;

-- AddForeignKey
ALTER TABLE "MichifWord" ADD CONSTRAINT "MichifWord_englishWordId_fkey" FOREIGN KEY ("englishWordId") REFERENCES "EnglishWord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
