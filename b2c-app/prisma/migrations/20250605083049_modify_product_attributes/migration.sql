/*
  Warnings:

  - The `switchType` column on the `Keyboard` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `color` column on the `Keyboard` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `backlight` column on the `Keyboard` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Keyboard" DROP COLUMN "switchType",
ADD COLUMN     "switchType" TEXT[],
DROP COLUMN "color",
ADD COLUMN     "color" TEXT[],
DROP COLUMN "backlight",
ADD COLUMN     "backlight" TEXT[];
