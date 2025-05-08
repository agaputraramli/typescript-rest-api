/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : PostgreSQL
 Source Server Version : 170004 (170004)
 Source Host           : localhost:5432
 Source Catalog        : public
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170004 (170004)
 File Encoding         : 65001

 Date: 06/05/2025 20:16:39
*/


-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "info" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, 'test@example.com', 'test', 'Cgpv6HHh37GzqCtzxNiEhw==', '"password" aes 128 ecb');

-- ----------------------------
-- Table structure for parameter_config
-- ----------------------------
DROP TABLE IF EXISTS "public"."parameter_config";
CREATE TABLE "public"."parameter_config" (
  "id" int4 NOT NULL,
  "config_key" varchar(255) COLLATE "pg_catalog"."default",
  "config_value" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of parameter_config
-- ----------------------------
INSERT INTO "public"."parameter_config" VALUES (1, 'knitto_secret_key', 'testknittopasswo');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS "public"."orders";
CREATE TABLE "public"."orders" (
  "id" int4 NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
  "customer_id" int4 NOT NULL,
  "total" int4 NOT NULL
)
;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO "public"."orders" VALUES (1, 1, 50000);
INSERT INTO "public"."orders" VALUES (2, 1, 50000);

-- ----------------------------
-- Table structure for order_items
-- ----------------------------
DROP TABLE IF EXISTS "public"."order_items";
CREATE TABLE "public"."order_items" (
  "id" int4 NOT NULL DEFAULT nextval('order_items_id_seq'::regclass),
  "order_id" int4 NOT NULL,
  "product_id" int4 NOT NULL,
  "quantity" int4 NOT NULL
)
;

-- ----------------------------
-- Records of order_items
-- ----------------------------
INSERT INTO "public"."order_items" VALUES (1, 1, 101, 2);
INSERT INTO "public"."order_items" VALUES (2, 1, 102, 1);
INSERT INTO "public"."order_items" VALUES (3, 2, 101, 3);
INSERT INTO "public"."order_items" VALUES (4, 2, 102, 5);

-- ----------------------------
-- Table structure for items
-- ----------------------------
DROP TABLE IF EXISTS "public"."items";
CREATE TABLE "public"."items" (
  "id" int4 NOT NULL DEFAULT nextval('items_id_seq'::regclass),
  "code" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of items
-- ----------------------------
INSERT INTO "public"."items" VALUES (1, 'ITEM-0001', 'Barang1', '2025-05-06 09:59:03.230491');

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table parameter_config
-- ----------------------------
ALTER TABLE "public"."parameter_config" ADD CONSTRAINT "config_parameter_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table order_items
-- ----------------------------
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table items
-- ----------------------------
ALTER TABLE "public"."items" ADD CONSTRAINT "items_code_key" UNIQUE ("code");

-- ----------------------------
-- Primary Key structure for table items
-- ----------------------------
ALTER TABLE "public"."items" ADD CONSTRAINT "items_pkey" PRIMARY KEY ("id");
