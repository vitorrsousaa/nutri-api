/*
  Warnings:

  - The values [LEGUMES] on the enum `food_types` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "food_types_new" AS ENUM ('FRUIT', 'PROTEIN', 'CARB', 'CEREAL', 'OTHERS', 'MILK');
ALTER TABLE "foods" ALTER COLUMN "group" TYPE "food_types_new" USING ("group"::text::"food_types_new");
ALTER TYPE "food_types" RENAME TO "food_types_old";
ALTER TYPE "food_types_new" RENAME TO "food_types";
DROP TYPE "food_types_old";
COMMIT;
