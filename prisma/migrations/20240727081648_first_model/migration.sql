-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(255) NULL,
    `profile_picture` VARCHAR(191) NULL,
    `is_confirmed` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_email_key`(`username`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otpcodes` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `otp_code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `otpcodes_user_id_idx`(`user_id`),
    INDEX `otpcodes_otp_code_idx`(`otp_code`),
    UNIQUE INDEX `otpcodes_user_id_otp_code_key`(`user_id`, `otp_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `followers` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    INDEX `followers_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `following` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    INDEX `following_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `is_edited` BOOLEAN NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `posts_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likes` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,

    INDEX `likes_user_id_idx`(`user_id`),
    INDEX `likes_post_id_idx`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `comments_post_id_idx`(`post_id`),
    INDEX `comments_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `replyComments` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `comment_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `replyComments_post_id_idx`(`post_id`),
    INDEX `replyComments_user_id_idx`(`user_id`),
    INDEX `replyComments_comment_id_idx`(`comment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likeComments` (
    `id` VARCHAR(191) NOT NULL,
    `comment_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    INDEX `likeComments_comment_id_idx`(`comment_id`),
    INDEX `likeComments_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likeReplyComments` (
    `id` VARCHAR(191) NOT NULL,
    `reply_comment_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `likeReplyComments_reply_comment_id_idx`(`reply_comment_id`),
    INDEX `likeReplyComments_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `otpcodes` ADD CONSTRAINT `otpcodes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `following` ADD CONSTRAINT `following_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `replyComments` ADD CONSTRAINT `replyComments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `replyComments` ADD CONSTRAINT `replyComments_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `replyComments` ADD CONSTRAINT `replyComments_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likeComments` ADD CONSTRAINT `likeComments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likeComments` ADD CONSTRAINT `likeComments_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likeReplyComments` ADD CONSTRAINT `likeReplyComments_reply_comment_id_fkey` FOREIGN KEY (`reply_comment_id`) REFERENCES `replyComments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likeReplyComments` ADD CONSTRAINT `likeReplyComments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
