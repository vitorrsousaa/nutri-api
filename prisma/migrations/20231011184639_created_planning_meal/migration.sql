/*
  Warnings:

  - Changed the type of `gender` on the `patients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "gender_types" AS ENUM ('MASC', 'FEM');

-- CreateEnum
CREATE TYPE "food_types" AS ENUM ('FRUIT', 'PROTEIN', 'CARB', 'LEGUMES');

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "gender",
ADD COLUMN     "gender" "gender_types" NOT NULL;

-- DropEnum
DROP TYPE "GenderType";

-- CreateTable
CREATE TABLE "plannings_meal" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "patient_id" UUID NOT NULL,

    CONSTRAINT "plannings_meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals" (
    "id" UUID NOT NULL,
    "planning_meal_id" UUID,
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_foods" (
    "id" UUID NOT NULL,
    "food_id" UUID NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "mealId" UUID,

    CONSTRAINT "meal_foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foods" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "carb" DOUBLE PRECISION NOT NULL,
    "group" "food_types" NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plannings_meal" ADD CONSTRAINT "plannings_meal_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plannings_meal" ADD CONSTRAINT "plannings_meal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_planning_meal_id_fkey" FOREIGN KEY ("planning_meal_id") REFERENCES "plannings_meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_foods" ADD CONSTRAINT "meal_foods_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_foods" ADD CONSTRAINT "meal_foods_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
