-- AlterTable
ALTER TABLE `charges` ADD COLUMN `pix_id` INTEGER NULL,
    ADD COLUMN `status` ENUM('CREATED', 'EXPIRED', 'PAID', 'CREDITED') NOT NULL DEFAULT 'CREATED';

-- AlterTable
ALTER TABLE `charges_backup` ADD COLUMN `pix_id` INTEGER NULL,
    ADD COLUMN `status` ENUM('CREATED', 'EXPIRED', 'PAID', 'CREDITED') NOT NULL DEFAULT 'CREATED';
