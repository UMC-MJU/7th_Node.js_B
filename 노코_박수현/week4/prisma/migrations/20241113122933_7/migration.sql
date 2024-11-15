/*
  Warnings:

  - You are about to alter the column `deadline` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `member` MODIFY `social_type` VARCHAR(10) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `mission` MODIFY `deadline` DATETIME NULL;
