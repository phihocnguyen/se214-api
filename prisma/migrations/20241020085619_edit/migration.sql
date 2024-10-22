/*
  Warnings:

  - Added the required column `seen` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Conversation` ADD COLUMN `seen` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `Message` ADD COLUMN `senderId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
