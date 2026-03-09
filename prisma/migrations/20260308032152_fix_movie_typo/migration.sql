/*
  Warnings:

  - You are about to drop the column `posteUrl` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `tittle` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `WatchListItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "posteUrl",
DROP COLUMN "tittle",
ADD COLUMN     "posterUrl" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WatchListItem_userId_movieId_key" ON "WatchListItem"("userId", "movieId");
