-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `company_name` VARCHAR(191) NULL,
    `image` LONGBLOB NULL,

    UNIQUE INDEX `user_id_key`(`id`),
    UNIQUE INDEX `user_phone_key`(`phone`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_role` (
    `id_user` INTEGER NOT NULL,
    `id_role` INTEGER NOT NULL,

    PRIMARY KEY (`id_user`, `id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `canton` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `direction` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `phone` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_method` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `account_number` VARCHAR(191) NOT NULL,
    `expiration_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payment_method_account_number_key`(`account_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_header` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_payment_method` INTEGER NOT NULL,
    `id_address` INTEGER NOT NULL,
    `total` DECIMAL(65, 30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `payed` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_header` INTEGER NOT NULL,
    `id_product` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `subtotal` DECIMAL(65, 30) NOT NULL,
    `arrivalDate` DATETIME(3) NULL,
    `client_rating` INTEGER NULL,
    `seller_rating` INTEGER NULL,
    `client_feedback` VARCHAR(191) NULL,
    `seller_feedback` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_type` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_category` (
    `id_product` INTEGER NOT NULL,
    `id_category` INTEGER NOT NULL,

    PRIMARY KEY (`id_product`, `id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_product` INTEGER NOT NULL,
    `image` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_product` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_comment` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_role` ADD CONSTRAINT `user_role_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_role` ADD CONSTRAINT `user_role_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_method` ADD CONSTRAINT `payment_method_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_header` ADD CONSTRAINT `transaction_header_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_header` ADD CONSTRAINT `transaction_header_id_payment_method_fkey` FOREIGN KEY (`id_payment_method`) REFERENCES `payment_method`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_header` ADD CONSTRAINT `transaction_header_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail` ADD CONSTRAINT `transaction_detail_id_header_fkey` FOREIGN KEY (`id_header`) REFERENCES `transaction_header`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail` ADD CONSTRAINT `transaction_detail_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_id_type_fkey` FOREIGN KEY (`id_type`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_category` ADD CONSTRAINT `product_category_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_category` ADD CONSTRAINT `product_category_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_id_comment_fkey` FOREIGN KEY (`id_comment`) REFERENCES `comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
