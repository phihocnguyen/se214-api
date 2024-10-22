/*
  Warnings:

  - You are about to drop the column `status` on the `WorkingShifts` table. All the data in the column will be lost.
  - Added the required column `status` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `WorkingShifts` DROP COLUMN `status`;
