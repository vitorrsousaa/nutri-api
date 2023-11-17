-- CreateEnum
CREATE TYPE "status_types" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "status" "status_types" DEFAULT 'ACTIVE',
ALTER COLUMN "birthDate" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL;
