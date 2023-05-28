-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
