/*
  Warnings:

  - A unique constraint covering the columns `[date,time]` on the table `WorkingShifts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `WorkingShifts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `WorkingShifts` ADD COLUMN `date` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `WorkingShifts_date_time_key` ON `WorkingShifts`(`date`, `time`);
