-- CreateTable
CREATE TABLE `member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,
    `gender` VARCHAR(10) NULL,
    `age` INTEGER NULL,
    `address` VARCHAR(40) NULL,
    `spec_address` VARCHAR(40) NULL,
    `phone_num` VARCHAR(13) NULL,
    `status` VARCHAR(15) NULL,
    `inactive_date` VARCHAR(6) NULL,
    `create_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `email` VARCHAR(50) NULL,
    `point` INTEGER NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NULL,
    `column4` VARCHAR(15) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_prefer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NULL,
    `category_id` INTEGER NULL,

    INDEX `category_id`(`category_id`),
    INDEX `member_id`(`member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `region_id` INTEGER NULL,
    `name` VARCHAR(50) NULL,
    `address` VARCHAR(50) NULL,
    `score` DOUBLE NOT NULL,
    `create_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `region_id`(`region_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER NULL,
    `reward` INTEGER NULL,
    `deadline` VARCHAR(191) NULL,
    `mission_spec` TEXT NULL,
    `create_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `store_id`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NULL,
    `mission_id` INTEGER NULL,
    `status` VARCHAR(15) NULL,
    `create_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `member_id`(`member_id`),
    INDEX `mission_id`(`mission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `member_prefer` ADD CONSTRAINT `member_prefer_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_prefer` ADD CONSTRAINT `member_prefer_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `food_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
