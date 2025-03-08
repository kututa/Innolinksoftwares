/*
  Warnings:

  - You are about to drop the column `providerId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_providerId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "providerId";
