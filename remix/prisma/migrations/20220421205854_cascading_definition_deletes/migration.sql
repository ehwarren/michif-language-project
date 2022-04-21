-- DropForeignKey
ALTER TABLE "EnglishDefinition" DROP CONSTRAINT "EnglishDefinition_englishWordId_fkey";

-- AddForeignKey
ALTER TABLE "EnglishDefinition" ADD CONSTRAINT "EnglishDefinition_englishWordId_fkey" FOREIGN KEY ("englishWordId") REFERENCES "EnglishWord"("id") ON DELETE CASCADE ON UPDATE CASCADE;
