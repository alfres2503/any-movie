/*
  Warnings:

  - You are about to drop the column `state` on the `transaction_header` table. All the data in the column will be lost.
  - Added the required column `payed` to the `transaction_header` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction_header` DROP COLUMN `state`,
    ADD COLUMN `payed` BOOLEAN NOT NULL;
