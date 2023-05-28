/*
  Warnings:

  - You are about to drop the column `cirection` on the `adress` table. All the data in the column will be lost.
  - You are about to drop the column `accountNumber` on the `payment_method` table. All the data in the column will be lost.
  - You are about to drop the column `expirationDate` on the `payment_method` table. All the data in the column will be lost.
  - You are about to drop the column `State` on the `transaction_header` table. All the data in the column will be lost.
  - You are about to drop the column `Total` on the `transaction_header` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `adress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_number]` on the table `payment_method` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `direction` to the `adress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_number` to the `payment_method` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiration_date` to the `payment_method` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `transaction_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `transaction_header` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adress` DROP COLUMN `cirection`,
    ADD COLUMN `direction` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `payment_method` DROP COLUMN `accountNumber`,
    DROP COLUMN `expirationDate`,
    ADD COLUMN `account_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `expiration_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `transaction_detail` MODIFY `client_rating` VARCHAR(191) NULL,
    MODIFY `seller_rating` VARCHAR(191) NULL,
    MODIFY `client_feedback` VARCHAR(191) NULL,
    MODIFY `seller_feedback` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `transaction_header` DROP COLUMN `State`,
    DROP COLUMN `Total`,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `total` DECIMAL(65, 30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `adress_phone_key` ON `adress`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `payment_method_account_number_key` ON `payment_method`(`account_number`);

-- CreateIndex
CREATE UNIQUE INDEX `user_phone_key` ON `user`(`phone`);
