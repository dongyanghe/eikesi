/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : demo

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 22/05/2018 23:34:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `handle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_blog_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `fk_blog_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES (1, 'aaa', 'aaa', 3);

-- ----------------------------
-- Table structure for databasechangelog
-- ----------------------------
DROP TABLE IF EXISTS `databasechangelog`;
CREATE TABLE `databasechangelog`  (
  `ID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `AUTHOR` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `FILENAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DATEEXECUTED` datetime(0) NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MD5SUM` varchar(35) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `DESCRIPTION` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `COMMENTS` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `TAG` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `LIQUIBASE` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `CONTEXTS` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `LABELS` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of databasechangelog
-- ----------------------------
INSERT INTO `databasechangelog` VALUES ('00000000000001', 'jhipster', 'config/liquibase/changelog/00000000000000_initial_schema.xml', '2018-04-30 15:30:03', 1, 'EXECUTED', '7:a4e75cf36704dcafc83029042375669a', 'createTable tableName=jhi_user; createIndex indexName=idx_user_login, tableName=jhi_user; createIndex indexName=idx_user_email, tableName=jhi_user; createTable tableName=jhi_authority; createTable tableName=jhi_user_authority; addPrimaryKey tableN...', '', NULL, '3.5.4', NULL, NULL, '5073402900');
INSERT INTO `databasechangelog` VALUES ('20180430074407-1', 'jhipster', 'config/liquibase/changelog/20180430074407_added_entity_Blog.xml', '2018-04-30 16:08:11', 2, 'EXECUTED', '7:d353b9eb5cc3a5484b6a40db50d89e2f', 'createTable tableName=blog', '', NULL, '3.5.4', NULL, NULL, '5075691512');
INSERT INTO `databasechangelog` VALUES ('20180430074408-1', 'jhipster', 'config/liquibase/changelog/20180430074408_added_entity_Entry.xml', '2018-04-30 16:08:11', 3, 'EXECUTED', '7:89ddcbd6107d26acd1a0b9742f4f2671', 'createTable tableName=entry; dropDefaultValue columnName=jhi_date, tableName=entry; createTable tableName=entry_tag; addPrimaryKey tableName=entry_tag', '', NULL, '3.5.4', NULL, NULL, '5075691512');
INSERT INTO `databasechangelog` VALUES ('20180430074409-1', 'jhipster', 'config/liquibase/changelog/20180430074409_added_entity_Tag.xml', '2018-04-30 16:08:11', 4, 'EXECUTED', '7:ae2050b9ca9b9255a7df3b5352eb94c5', 'createTable tableName=tag', '', NULL, '3.5.4', NULL, NULL, '5075691512');
INSERT INTO `databasechangelog` VALUES ('20180430074407-2', 'jhipster', 'config/liquibase/changelog/20180430074407_added_entity_constraints_Blog.xml', '2018-04-30 16:08:11', 5, 'EXECUTED', '7:e067705cb5b74eba990d396ea0ee2b7c', 'addForeignKeyConstraint baseTableName=blog, constraintName=fk_blog_user_id, referencedTableName=jhi_user', '', NULL, '3.5.4', NULL, NULL, '5075691512');
INSERT INTO `databasechangelog` VALUES ('20180430074408-2', 'jhipster', 'config/liquibase/changelog/20180430074408_added_entity_constraints_Entry.xml', '2018-04-30 16:08:12', 6, 'EXECUTED', '7:092f57e72d94251b27607e7ccbd49250', 'addForeignKeyConstraint baseTableName=entry, constraintName=fk_entry_blog_id, referencedTableName=blog; addForeignKeyConstraint baseTableName=entry_tag, constraintName=fk_entry_tag_entries_id, referencedTableName=entry; addForeignKeyConstraint bas...', '', NULL, '3.5.4', NULL, NULL, '5075691512');
INSERT INTO `databasechangelog` VALUES ('20180514155128-1', 'jhipster', 'config/liquibase/changelog/20180514155128_added_entity_UserRelation.xml', '2018-05-16 12:22:39', 7, 'EXECUTED', '7:0ed04a8fa21cbc239ca5440a1d96f646', 'createTable tableName=user_relation', '', NULL, '3.5.4', NULL, NULL, '6444559300');
INSERT INTO `databasechangelog` VALUES ('20180514155129-1', 'jhipster', 'config/liquibase/changelog/20180514155129_added_entity_UserFlock.xml', '2018-05-16 12:22:39', 8, 'EXECUTED', '7:ddb39faa5c6fb639edbbd30f75ecc229', 'createTable tableName=user_flock', '', NULL, '3.5.4', NULL, NULL, '6444559300');
INSERT INTO `databasechangelog` VALUES ('20180515074703-1', 'jhipster', 'config/liquibase/changelog/20180515074703_added_entity_DemoA.xml', '2018-05-16 12:22:39', 9, 'EXECUTED', '7:2c0fa959dabb97b0993b82b32fdf909a', 'createTable tableName=demo_a; dropDefaultValue columnName=date_time_when, tableName=demo_a; dropDefaultValue columnName=zoned_date_time_when, tableName=demo_a; dropDefaultValue columnName=instant_type, tableName=demo_a; createTable tableName=demoa...', '', NULL, '3.5.4', NULL, NULL, '6444559300');
INSERT INTO `databasechangelog` VALUES ('20180515074704-1', 'jhipster', 'config/liquibase/changelog/20180515074704_added_entity_DemoB.xml', '2018-05-16 12:22:39', 10, 'EXECUTED', '7:b8ba985048990941f834c2d19ed54281', 'createTable tableName=demo_b', '', NULL, '3.5.4', NULL, NULL, '6444559300');
INSERT INTO `databasechangelog` VALUES ('20180515074705-1', 'jhipster', 'config/liquibase/changelog/20180515074705_added_entity_DemoC.xml', '2018-05-16 12:22:39', 11, 'EXECUTED', '7:94c3a974c0a3167dc100cc27de197bfd', 'createTable tableName=demo_c', '', NULL, '3.5.4', NULL, NULL, '6444559300');
INSERT INTO `databasechangelog` VALUES ('20180515074706-1', 'jhipster', 'config/liquibase/changelog/20180515074706_added_entity_DemoD.xml', '2018-05-16 12:22:39', 12, 'EXECUTED', '7:24f7065e6a4e6ac97bb6c2b42a3d339d', 'createTable tableName=demo_d', '', NULL, '3.5.4', NULL, NULL, '6444559300');
INSERT INTO `databasechangelog` VALUES ('20180515074707-1', 'jhipster', 'config/liquibase/changelog/20180515074707_added_entity_DemoE.xml', '2018-05-16 12:22:39', 13, 'EXECUTED', '7:2cade0f920f5f5a274b3b1d7ba2819d4', 'createTable tableName=demo_e', '', NULL, '3.5.4', NULL, NULL, '6444559300');
INSERT INTO `databasechangelog` VALUES ('20180515074703-2', 'jhipster', 'config/liquibase/changelog/20180515074703_added_entity_constraints_DemoA.xml', '2018-05-16 12:22:40', 14, 'EXECUTED', '7:1bbc7835ffd67591082907bd88b0cbd0', 'addForeignKeyConstraint baseTableName=demo_a, constraintName=fk_demoa_demob_id, referencedTableName=demo_b; addForeignKeyConstraint baseTableName=demo_a, constraintName=fk_demoa_demoe_id, referencedTableName=demo_e; addForeignKeyConstraint baseTab...', '', NULL, '3.5.4', NULL, NULL, '6444559300');
INSERT INTO `databasechangelog` VALUES ('20180515074705-2', 'jhipster', 'config/liquibase/changelog/20180515074705_added_entity_constraints_DemoC.xml', '2018-05-16 12:22:40', 15, 'EXECUTED', '7:815562d256cfe9e737484e9e77730066', 'addForeignKeyConstraint baseTableName=demo_c, constraintName=fk_democ_demob_id, referencedTableName=demo_b', '', NULL, '3.5.4', NULL, NULL, '6444559300');
INSERT INTO `databasechangelog` VALUES ('20180515074707-2', 'jhipster', 'config/liquibase/changelog/20180515074707_added_entity_constraints_DemoE.xml', '2018-05-16 12:22:40', 16, 'EXECUTED', '7:2a1e5848f016c125b950721e2b39dc5b', 'addForeignKeyConstraint baseTableName=demo_e, constraintName=fk_demoe_demod_id, referencedTableName=demo_d', '', NULL, '3.5.4', NULL, NULL, '6444559300');

-- ----------------------------
-- Table structure for databasechangeloglock
-- ----------------------------
DROP TABLE IF EXISTS `databasechangeloglock`;
CREATE TABLE `databasechangeloglock`  (
  `ID` int(11) NOT NULL,
  `LOCKED` bit(1) NOT NULL,
  `LOCKGRANTED` datetime(0) NULL DEFAULT NULL,
  `LOCKEDBY` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of databasechangeloglock
-- ----------------------------
INSERT INTO `databasechangeloglock` VALUES (1, b'1', '2018-05-16 13:28:24', 'SC-201802112122 (192.168.0.105)');

-- ----------------------------
-- Table structure for demo_a
-- ----------------------------
DROP TABLE IF EXISTS `demo_a`;
CREATE TABLE `demo_a`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `jhi_number` int(11) NOT NULL,
  `big_decimal_num` decimal(10, 2) NOT NULL,
  `float_num` float NOT NULL,
  `double_num` double NOT NULL,
  `language_enum` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `blob_num` longblob NOT NULL,
  `blob_num_content_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `any_blob_num` longblob NOT NULL,
  `any_blob_num_content_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image_blob_num` longblob NOT NULL,
  `image_blob_num_content_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `text_blob_num` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `boolean_check` bit(1) NOT NULL,
  `local_date_when` date NOT NULL,
  `date_time_when` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `zoned_date_time_when` timestamp(0) NOT NULL,
  `instant_type` timestamp(0) NOT NULL,
  `demob_id` bigint(20) NULL DEFAULT NULL,
  `demoe_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `demob_id`(`demob_id`) USING BTREE,
  INDEX `fk_demoa_demoe_id`(`demoe_id`) USING BTREE,
  CONSTRAINT `fk_demoa_demob_id` FOREIGN KEY (`demob_id`) REFERENCES `demo_b` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_demoa_demoe_id` FOREIGN KEY (`demoe_id`) REFERENCES `demo_e` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for demo_b
-- ----------------------------
DROP TABLE IF EXISTS `demo_b`;
CREATE TABLE `demo_b`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for demo_c
-- ----------------------------
DROP TABLE IF EXISTS `demo_c`;
CREATE TABLE `demo_c`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `demob_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_democ_demob_id`(`demob_id`) USING BTREE,
  CONSTRAINT `fk_democ_demob_id` FOREIGN KEY (`demob_id`) REFERENCES `demo_b` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for demo_d
-- ----------------------------
DROP TABLE IF EXISTS `demo_d`;
CREATE TABLE `demo_d`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for demo_e
-- ----------------------------
DROP TABLE IF EXISTS `demo_e`;
CREATE TABLE `demo_e`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `demod_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_demoe_demod_id`(`demod_id`) USING BTREE,
  CONSTRAINT `fk_demoe_demod_id` FOREIGN KEY (`demod_id`) REFERENCES `demo_d` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for demoa_demod
-- ----------------------------
DROP TABLE IF EXISTS `demoa_demod`;
CREATE TABLE `demoa_demod`  (
  `demods_id` bigint(20) NOT NULL,
  `demoas_id` bigint(20) NOT NULL,
  PRIMARY KEY (`demoas_id`, `demods_id`) USING BTREE,
  INDEX `fk_demoa_demod_demods_id`(`demods_id`) USING BTREE,
  CONSTRAINT `fk_demoa_demod_demoas_id` FOREIGN KEY (`demoas_id`) REFERENCES `demo_a` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_demoa_demod_demods_id` FOREIGN KEY (`demods_id`) REFERENCES `demo_d` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for entry
-- ----------------------------
DROP TABLE IF EXISTS `entry`;
CREATE TABLE `entry`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `jhi_date` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `blog_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_entry_blog_id`(`blog_id`) USING BTREE,
  CONSTRAINT `fk_entry_blog_id` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of entry
-- ----------------------------
INSERT INTO `entry` VALUES (1, 'aaa1', 'aaa', '2018-04-21 01:00:00', 1);

-- ----------------------------
-- Table structure for entry_tag
-- ----------------------------
DROP TABLE IF EXISTS `entry_tag`;
CREATE TABLE `entry_tag`  (
  `tags_id` bigint(20) NOT NULL,
  `entries_id` bigint(20) NOT NULL,
  PRIMARY KEY (`entries_id`, `tags_id`) USING BTREE,
  INDEX `fk_entry_tag_tags_id`(`tags_id`) USING BTREE,
  CONSTRAINT `fk_entry_tag_entries_id` FOREIGN KEY (`entries_id`) REFERENCES `entry` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_entry_tag_tags_id` FOREIGN KEY (`tags_id`) REFERENCES `tag` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for jhi_authority
-- ----------------------------
DROP TABLE IF EXISTS `jhi_authority`;
CREATE TABLE `jhi_authority`  (
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jhi_authority
-- ----------------------------
INSERT INTO `jhi_authority` VALUES ('ROLE_ADMIN');
INSERT INTO `jhi_authority` VALUES ('ROLE_USER');

-- ----------------------------
-- Table structure for jhi_persistent_audit_event
-- ----------------------------
DROP TABLE IF EXISTS `jhi_persistent_audit_event`;
CREATE TABLE `jhi_persistent_audit_event`  (
  `event_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `principal` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `event_date` timestamp(0) NULL DEFAULT NULL,
  `event_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`) USING BTREE,
  INDEX `idx_persistent_audit_event`(`principal`, `event_date`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jhi_persistent_audit_event
-- ----------------------------
INSERT INTO `jhi_persistent_audit_event` VALUES (1, 'admin', '2018-04-30 15:30:30', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (2, 'admin', '2018-04-30 15:30:39', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (3, 'admin', '2018-04-30 16:10:12', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (4, 'admin', '2018-04-30 16:10:57', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (5, 'admin', '2018-04-30 19:40:36', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (6, 'admin', '2018-05-04 22:35:29', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (7, 'admin', '2018-05-04 22:41:04', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (8, 'admin', '2018-05-04 22:41:26', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (9, 'admin', '2018-05-04 22:43:26', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (10, 'admin', '2018-05-04 22:48:35', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (11, 'admin', '2018-05-04 22:50:15', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (12, 'admin', '2018-05-04 23:05:28', 'AUTHENTICATION_SUCCESS');
INSERT INTO `jhi_persistent_audit_event` VALUES (13, 'admin', '2018-05-06 21:14:25', 'AUTHENTICATION_SUCCESS');

-- ----------------------------
-- Table structure for jhi_persistent_audit_evt_data
-- ----------------------------
DROP TABLE IF EXISTS `jhi_persistent_audit_evt_data`;
CREATE TABLE `jhi_persistent_audit_evt_data`  (
  `event_id` bigint(20) NOT NULL,
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`, `name`) USING BTREE,
  INDEX `idx_persistent_audit_evt_data`(`event_id`) USING BTREE,
  CONSTRAINT `fk_evt_pers_audit_evt_data` FOREIGN KEY (`event_id`) REFERENCES `jhi_persistent_audit_event` (`event_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for jhi_user
-- ----------------------------
DROP TABLE IF EXISTS `jhi_user`;
CREATE TABLE `jhi_user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password_hash` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `first_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `image_url` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `activated` bit(1) NOT NULL,
  `lang_key` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `activation_key` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reset_key` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_by` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_date` timestamp(0) NOT NULL,
  `reset_date` timestamp(0) NULL DEFAULT NULL,
  `last_modified_by` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_modified_date` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ux_user_login`(`login`) USING BTREE,
  UNIQUE INDEX `idx_user_login`(`login`) USING BTREE,
  UNIQUE INDEX `ux_user_email`(`email`) USING BTREE,
  UNIQUE INDEX `idx_user_email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jhi_user
-- ----------------------------
INSERT INTO `jhi_user` VALUES (1, 'system', '$2a$10$mE.qmcV0mFU5NcKh73TZx.z4ueI/.bDWbj0T1BYyqP481kGGarKLG', 'System', 'System', 'system@localhost', '', b'1', 'zh-cn', NULL, NULL, 'system', '2018-04-30 15:30:03', NULL, 'system', NULL);
INSERT INTO `jhi_user` VALUES (2, 'anonymoususer', '$2a$10$j8S5d7Sr7.8VTOYNviDPOeWX8KcYILUVJBsYV83Y5NtECayypx9lO', 'Anonymous', 'User', 'anonymous@localhost', '', b'1', 'zh-cn', NULL, NULL, 'system', '2018-04-30 15:30:03', NULL, 'system', NULL);
INSERT INTO `jhi_user` VALUES (3, 'admin', '$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC', 'Administrator', 'Administrator', 'admin@localhost', '', b'1', 'zh-cn', NULL, NULL, 'system', '2018-04-30 15:30:03', NULL, 'system', NULL);
INSERT INTO `jhi_user` VALUES (4, 'user', '$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K', 'User', 'User', 'user@localhost', '', b'1', 'zh-cn', NULL, NULL, 'system', '2018-04-30 15:30:03', NULL, 'system', NULL);

-- ----------------------------
-- Table structure for jhi_user_authority
-- ----------------------------
DROP TABLE IF EXISTS `jhi_user_authority`;
CREATE TABLE `jhi_user_authority`  (
  `user_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`user_id`, `authority_name`) USING BTREE,
  INDEX `fk_authority_name`(`authority_name`) USING BTREE,
  CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jhi_user_authority
-- ----------------------------
INSERT INTO `jhi_user_authority` VALUES (1, 'ROLE_ADMIN');
INSERT INTO `jhi_user_authority` VALUES (3, 'ROLE_ADMIN');
INSERT INTO `jhi_user_authority` VALUES (1, 'ROLE_USER');
INSERT INTO `jhi_user_authority` VALUES (3, 'ROLE_USER');
INSERT INTO `jhi_user_authority` VALUES (4, 'ROLE_USER');

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_flock
-- ----------------------------
DROP TABLE IF EXISTS `user_flock`;
CREATE TABLE `user_flock`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `head_img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_relation
-- ----------------------------
DROP TABLE IF EXISTS `user_relation`;
CREATE TABLE `user_relation`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `remark_name` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `jhi_type` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
