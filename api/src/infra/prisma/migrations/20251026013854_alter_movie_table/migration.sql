/*
  Warnings:

  - You are about to drop the column `genreId` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the `email_reminders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cover` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profit` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revenue` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votes` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."email_reminders" DROP CONSTRAINT "email_reminders_movieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."movies" DROP CONSTRAINT "movies_genreId_fkey";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "genreId",
ADD COLUMN     "cover" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "profit" INTEGER NOT NULL,
ADD COLUMN     "revenue" INTEGER NOT NULL,
ADD COLUMN     "votes" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."email_reminders";

-- DropEnum
DROP TYPE "public"."EmailReminderStatus";

-- CreateTable
CREATE TABLE "genre_movies" (
    "genreId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "genre_movies_pkey" PRIMARY KEY ("genreId","movieId")
);

-- AddForeignKey
ALTER TABLE "genre_movies" ADD CONSTRAINT "genre_movies_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genre_movies" ADD CONSTRAINT "genre_movies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
