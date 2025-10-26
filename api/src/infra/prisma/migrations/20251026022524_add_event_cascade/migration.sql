-- DropForeignKey
ALTER TABLE "public"."genre_movies" DROP CONSTRAINT "genre_movies_genreId_fkey";

-- DropForeignKey
ALTER TABLE "public"."genre_movies" DROP CONSTRAINT "genre_movies_movieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."movies" DROP CONSTRAINT "movies_userId_fkey";

-- AddForeignKey
ALTER TABLE "genre_movies" ADD CONSTRAINT "genre_movies_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genre_movies" ADD CONSTRAINT "genre_movies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
