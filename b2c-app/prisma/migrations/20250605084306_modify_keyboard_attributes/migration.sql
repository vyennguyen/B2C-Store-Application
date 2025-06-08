/*
  Warnings:

  - The `color` column on the `Keycap` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Keycap" DROP COLUMN "color",
ADD COLUMN     "color" TEXT[];
