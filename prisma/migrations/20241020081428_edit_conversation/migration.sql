-- DropForeignKey
ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_senderId_fkey`;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `Doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
