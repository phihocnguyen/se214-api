/*
  Warnings:

  - You are about to drop the column `date` on the `WorkSchedule` table. All the data in the column will be lost.
  - Added the required column `day` to the `WorkSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `WorkSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `WorkSchedule` DROP COLUMN `date`,
    ADD COLUMN `day` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;
