CREATE TABLE IF NOT EXISTS `users` (
  `id` integer PRIMARY KEY,
  `fname` varchar(255),
  `lname` varchar(255),
  `email` varchar(255) UNIQUE,
  `pw` varchar(255),
  `salt` varchar(255),
  `created_by` integer,
  `creation_date` datetime,
  `deleted_by` integer,
  `deleted_date` datetime,
  `last_modified_by` integer,
  `last_modification_date` datetime
);

CREATE TABLE IF NOT EXISTS `roles` (
  `id` integer PRIMARY KEY,
  `roleName` varchar(255)
);

CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `role_id` integer,
  `created_by` integer,
  `creation_date` datetime,
  `deleted_by` integer,
  `deleted_date` datetime,
  `last_modified_by` integer,
  `last_modification_date` datetime
);

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` integer PRIMARY KEY,
  `permissionName` varchar(255),
  `parentPermissionId` integer
);

CREATE TABLE IF NOT EXISTS `role_permissions` (
  `id` integer PRIMARY KEY,
  `role_id` integer,
  `permission_id` integer,
  `created_by` integer,
  `creation_date` datetime,
  `deleted_by` integer,
  `deleted_date` datetime,
  `last_modified_by` integer,
  `last_modification_date` datetime
);

CREATE TABLE IF NOT EXISTS `user_permissions` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `permission_id` integer,
  `created_by` integer,
  `creation_date` datetime,
  `deleted_by` integer,
  `deleted_date` datetime,
  `last_modified_by` integer,
  `last_modification_date` datetime
);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `users` (`created_by`);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `users` (`deleted_by`);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `users` (`last_modified_by`);

ALTER TABLE `permissions` ADD FOREIGN KEY (`id`) REFERENCES `permissions` (`parentPermissionId`);

ALTER TABLE `role_permissions` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `role_permissions` ADD FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

ALTER TABLE `user_permissions` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_permissions` ADD FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

ALTER TABLE `user_roles` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_roles` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);