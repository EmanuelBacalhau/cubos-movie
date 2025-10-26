/*
  Warnings:

  - Changed the type of `rating` on the `movies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL;
