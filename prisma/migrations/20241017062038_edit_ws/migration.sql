/*
  Warnings:

  - You are about to drop the column `workingScheduleId` on the `WorkingShifts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `WorkingShifts` DROP FOREIGN KEY `WorkingShifts_workingScheduleId_fkey`;

-- AlterTable
ALTER TABLE `WorkingShifts` DROP COLUMN `workingScheduleId`;
