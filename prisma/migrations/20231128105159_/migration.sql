/*
  Warnings:

  - You are about to drop the column `images` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `images`;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NULL;
