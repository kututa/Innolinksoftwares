/*
  Warnings:

  - The values [shipped,delivered] on the enum `OrderProgressStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderProgressStatus_new" AS ENUM ('pending', 'processing', 'cancelled');
ALTER TABLE "OrderProgress" ALTER COLUMN "status" TYPE "OrderProgressStatus_new" USING ("status"::text::"OrderProgressStatus_new");
ALTER TYPE "OrderProgressStatus" RENAME TO "OrderProgressStatus_old";
ALTER TYPE "OrderProgressStatus_new" RENAME TO "OrderProgressStatus";
DROP TYPE "OrderProgressStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "icon" TEXT;
