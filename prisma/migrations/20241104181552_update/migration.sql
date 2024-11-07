-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_verifiedEmailId_fkey`;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_verifiedEmailId_fkey` FOREIGN KEY (`verifiedEmailId`) REFERENCES `VerifiedEmail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
