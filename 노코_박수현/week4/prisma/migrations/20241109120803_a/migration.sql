/*
  Warnings:

  - You are about to alter the column `name` on the `food_category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(15)`.
  - You are about to alter the column `deadline` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `food_category` MODIFY `name` VARCHAR(15) NULL;

-- AlterTable
ALTER TABLE `member` ALTER COLUMN `social_type` DROP DEFAULT;

-- AlterTable
ALTER TABLE `mission` MODIFY `deadline` DATETIME NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `score` FLOAT NULL;

-- AlterTable
ALTER TABLE `store` MODIFY `score` FLOAT NULL;
