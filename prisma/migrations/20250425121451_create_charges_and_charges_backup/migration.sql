-- CreateTable
CREATE TABLE `charges` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `due_date` DATETIME(3) NULL,
    `external_id` VARCHAR(191) NOT NULL,
    `transaction_id` VARCHAR(191) NOT NULL,
    `instruction_text` VARCHAR(191) NOT NULL,
    `customer_name` VARCHAR(191) NULL,
    `customer_document` VARCHAR(191) NULL,
    `customer_email` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `charges_external_id_key`(`external_id`),
    UNIQUE INDEX `charges_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `charges_backup` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `due_date` DATETIME(3) NULL,
    `external_id` VARCHAR(191) NOT NULL,
    `transaction_id` VARCHAR(191) NOT NULL,
    `instruction_text` VARCHAR(191) NOT NULL,
    `customer_name` VARCHAR(191) NULL,
    `customer_document` VARCHAR(191) NULL,
    `customer_email` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `charges_backup_external_id_key`(`external_id`),
    UNIQUE INDEX `charges_backup_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
