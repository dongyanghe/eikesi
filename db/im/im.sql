/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : im

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 22/05/2018 23:34:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for current_message
-- ----------------------------
DROP TABLE IF EXISTS `current_message`;
CREATE TABLE `current_message`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `jhi_type` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_date` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `created_id` bigint(20) NOT NULL,
  `target_date` timestamp(0) NOT NULL,
  `target_id` bigint(20) NOT NULL,
  `dialogue_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_current_message_dialogue_id`(`dialogue_id`) USING BTREE,
  CONSTRAINT `fk_current_message_dialogue_id` FOREIGN KEY (`dialogue_id`) REFERENCES `dialogue` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `databasechangelog` VALUES ('00000000000001', 'jhipster', 'config/liquibase/changelog/00000000000000_initial_schema.xml', '2018-05-12 23:06:14', 1, 'EXECUTED', '7:9d88ecd533d5a3530e304f778b9dc982', 'createTable tableName=jhi_persistent_audit_event; createTable tableName=jhi_persistent_audit_evt_data; addPrimaryKey tableName=jhi_persistent_audit_evt_data; createIndex indexName=idx_persistent_audit_event, tableName=jhi_persistent_audit_event; c...', '', NULL, '3.5.4', NULL, NULL, '6137573691');
INSERT INTO `databasechangelog` VALUES ('20180518072126-1', 'jhipster', 'config/liquibase/changelog/20180518072126_added_entity_HistoryMessage.xml', '2018-05-22 22:32:39', 2, 'EXECUTED', '7:0e9499e15a3d248d7a768570512e3a8f', 'createTable tableName=history_message; dropDefaultValue columnName=created_date, tableName=history_message; dropDefaultValue columnName=target_date, tableName=history_message', '', NULL, '3.5.4', NULL, NULL, '6999559787');
INSERT INTO `databasechangelog` VALUES ('20180518072127-1', 'jhipster', 'config/liquibase/changelog/20180518072127_added_entity_CurrentMessage.xml', '2018-05-22 22:32:39', 3, 'EXECUTED', '7:5e6789f3db059ce916aead05653afe66', 'createTable tableName=current_message; dropDefaultValue columnName=created_date, tableName=current_message; dropDefaultValue columnName=target_date, tableName=current_message', '', NULL, '3.5.4', NULL, NULL, '6999559787');
INSERT INTO `databasechangelog` VALUES ('20180518072128-1', 'jhipster', 'config/liquibase/changelog/20180518072128_added_entity_Dialogue.xml', '2018-05-22 22:32:40', 4, 'EXECUTED', '7:cee02cf8b5141650b1451aac6a058450', 'createTable tableName=dialogue; dropDefaultValue columnName=created_date, tableName=dialogue', '', NULL, '3.5.4', NULL, NULL, '6999559787');
INSERT INTO `databasechangelog` VALUES ('20180518072127-2', 'jhipster', 'config/liquibase/changelog/20180518072127_added_entity_constraints_CurrentMessage.xml', '2018-05-22 22:32:40', 5, 'EXECUTED', '7:35b0285f9d85312778bba8c5b2ebe0ff', 'addForeignKeyConstraint baseTableName=current_message, constraintName=fk_current_message_dialogue_id, referencedTableName=dialogue', '', NULL, '3.5.4', NULL, NULL, '6999559787');

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
INSERT INTO `databasechangeloglock` VALUES (1, b'0', NULL, NULL);

-- ----------------------------
-- Table structure for dialogue
-- ----------------------------
DROP TABLE IF EXISTS `dialogue`;
CREATE TABLE `dialogue`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `created_id` bigint(20) NOT NULL,
  `target_id` bigint(20) NOT NULL,
  `target_type` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for history_message
-- ----------------------------
DROP TABLE IF EXISTS `history_message`;
CREATE TABLE `history_message`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_date` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `created_id` bigint(20) NOT NULL,
  `target_date` timestamp(0) NOT NULL,
  `target_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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

SET FOREIGN_KEY_CHECKS = 1;
