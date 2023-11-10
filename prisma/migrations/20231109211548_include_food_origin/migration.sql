/*
  Warnings:

  - You are about to drop the column `mealId` on the `meal_foods` table. All the data in the column will be lost.
  - Added the required column `calories` to the `meal_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carb` to the `meal_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `meal_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `food_origin` to the `meal_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `meal_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `meal_foods` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meal_foods" DROP CONSTRAINT "meal_foods_food_id_fkey";

-- DropForeignKey
ALTER TABLE "meal_foods" DROP CONSTRAINT "meal_foods_mealId_fkey";

-- AlterTable
ALTER TABLE "meal_foods" DROP COLUMN "mealId",
ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "carb" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "food_origin" TEXT NOT NULL,
ADD COLUMN     "meal_id" UUID,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "protein" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "food_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "plannings_meal" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "meal_foods" ADD CONSTRAINT "meal_foods_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
