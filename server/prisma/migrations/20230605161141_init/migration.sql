/*
  Warnings:

  - You are about to drop the column `state` on the `product` table. All the data in the column will be lost.
  - Added the required column `price` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `state`,
    ADD COLUMN `price` DECIMAL(65, 30) NOT NULL;
