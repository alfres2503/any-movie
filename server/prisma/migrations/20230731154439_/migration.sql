/*
  Warnings:

  - You are about to alter the column `image` on the `user` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `image` LONGTEXT NULL;
