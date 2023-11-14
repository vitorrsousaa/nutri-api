/*
  Warnings:

  - Added the required column `base_unit` to the `meal_foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meal_foods" ADD COLUMN     "base_unit" TEXT NOT NULL;
