/*
  Warnings:

  - You are about to alter the column `client_rating` on the `transaction_detail` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `seller_rating` on the `transaction_detail` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `transaction_detail` MODIFY `client_rating` INTEGER NULL,
    MODIFY `seller_rating` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(191) NOT NULL;
