-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for crud
CREATE DATABASE IF NOT EXISTS `crud` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `crud`;

-- Dumping structure for table crud.admins
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `town` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table crud.admins: ~2 rows (approximately)
DELETE FROM `admins`;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` (`id`, `client_id`, `email`, `name`, `address`, `town`, `province`, `contact`, `password`) VALUES
	(1, 'zcasf', 'mysuniah@gmail.com', 'cabatuan', '1asd', 'asd', 'asdas', 'asda', '$2b$10$RnLXmXE8d.ep1y7QzD.zo.C0v/BAWOnrNZFvZh/EzbgnZZg/sNX6.'),
	(21, NULL, 'rar@gmail.com', 'dasd', 'asdas', 'dsa', 'asd', 'asd', '213'),
	(24, NULL, '123@gmail.com', 'asd', 'Block 2, Lot 10', 'Pavia', 'Iloilo', '09216630092', '$2b$10$cesaP5xwCA8L2t6s7UltfuU3dJpjIqU.j15/4dGexMm8J0mjZR/qS'),
	(25, NULL, '3123123@gmail.com', 'asd', 'Block 2, Lot 10', 'Pavia', 'Iloilo', '12345678901', '$2b$10$9E3lEpd7GhpmmqNngqrzMOihfLjmer/Kl/.qSXBTG.3wN30okY3Ly'),
	(26, 'c695eb7d-ec14-4ecd-ac92-80c3d891e6d5', 'iamcasdasdasdasdasddgmx@gmail.com', 'asd', 'Block 2, Lot 10', 'Pavia', 'Iloilo', '09216630092', '$2b$10$Zu8cu1KAlA8qDYkoaNt2cOXq/BlvIlvrcIOY9Tr7CrlKS0L4Zl/0a');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;

-- Dumping structure for table crud.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` varchar(50) DEFAULT NULL,
  `permission` char(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table crud.clients: ~7 rows (approximately)
DELETE FROM `clients`;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` (`id`, `client_id`, `permission`) VALUES
	(1, 'zcasf', '1'),
	(2, 'qwerqwe', '0'),
	(9, 'c1a19d12-b551-4da4-a9e1-b4a8a34468e5', '0'),
	(10, '97babe84-b5db-4eb4-ae97-1fa80d58e25b', '0'),
	(11, 'bb75dca8-a500-4e1f-9d35-c94ed6df2fb6', '0'),
	(12, 'df4fcfd5-2a04-44e9-8cfe-3587ff1b27a4', '0'),
	(13, '7c7fb0b7-a14a-4e8f-b25f-6e5622454909', '0'),
	(14, 'c466334c-c8cd-4d2b-96ee-a30098afa507', '0'),
	(15, '11535cd5-9f36-4044-af57-470118af5c14', '0'),
	(16, 'bbb455fc-2c38-4b11-8285-f8bd07ba0919', '1'),
	(17, '343895d7-cdb2-44e5-8015-23b9a17ee3b9', '1'),
	(18, 'c695eb7d-ec14-4ecd-ac92-80c3d891e6d5', '1'),
	(19, 'e447ed7d-3a82-41c2-a98b-117e24ebffaf', '0');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;

-- Dumping structure for table crud.scanned
CREATE TABLE IF NOT EXISTS `scanned` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `admin_id` varchar(50) DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `day` varchar(50) DEFAULT NULL,
  `month` varchar(50) DEFAULT NULL,
  `year` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `period` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table crud.scanned: ~56 rows (approximately)
DELETE FROM `scanned`;
/*!40000 ALTER TABLE `scanned` DISABLE KEYS */;
INSERT INTO `scanned` (`id`, `admin_id`, `user_id`, `date`, `day`, `month`, `year`, `time`, `period`) VALUES
	(107, 'zcasf', 'qwerqwe', '2020-11-27', '27', '11', '2020', '8:46', 'PM'),
	(108, 'zcasf', 'qwerqwe', '2020-11-27', '27', '11', '2020', '3', 'PM'),
	(109, 'zcasf', 'qwerqwe', '123', '27', '11', '2020', '8:46', 'PM'),
	(110, 'zcas', 'qwerqwe', '12312', '27', '11', '2020', '8:46', 'PM'),
	(111, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '1:39', 'PM'),
	(112, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '1:41', 'PM'),
	(113, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '1:41', 'PM'),
	(114, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '1:45', 'PM'),
	(115, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '1:52', 'PM'),
	(116, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '1:58', 'PM'),
	(117, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '1:59', 'PM'),
	(118, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '2:00', 'PM'),
	(119, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:24', 'PM'),
	(120, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:26', 'PM'),
	(121, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:35', 'PM'),
	(122, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(123, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(124, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(125, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(126, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(127, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(128, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(129, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(130, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(131, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(132, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(133, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:36', 'PM'),
	(134, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:43', 'PM'),
	(135, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:44', 'PM'),
	(136, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:45', 'PM'),
	(137, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:45', 'PM'),
	(138, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:46', 'PM'),
	(139, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:46', 'PM'),
	(140, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:47', 'PM'),
	(141, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:49', 'PM'),
	(142, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:50', 'PM'),
	(143, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '8:51', 'PM'),
	(144, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:02', 'PM'),
	(145, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:05', 'PM'),
	(146, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:05', 'PM'),
	(147, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:05', 'PM'),
	(148, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:05', 'PM'),
	(149, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:06', 'PM'),
	(150, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:07', 'PM'),
	(151, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:07', 'PM'),
	(152, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:08', 'PM'),
	(153, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:09', 'PM'),
	(154, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:09', 'PM'),
	(155, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:09', 'PM'),
	(156, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:10', 'PM'),
	(157, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:10', 'PM'),
	(158, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:10', 'PM'),
	(159, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:10', 'PM'),
	(160, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:10', 'PM'),
	(161, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:11', 'PM'),
	(162, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:13', 'PM'),
	(163, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:13', 'PM'),
	(164, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:13', 'PM'),
	(165, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:13', 'PM'),
	(166, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:13', 'PM'),
	(167, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:14', 'PM'),
	(168, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:14', 'PM'),
	(169, 'zcasf', 'qwerqwe', '2020-11-28', '28', '11', '2020', '9:14', 'PM'),
	(170, 'zcasf', 'qwerqwe', '2020-11-29', '29', '11', '2020', '10:53', 'AM');
/*!40000 ALTER TABLE `scanned` ENABLE KEYS */;

-- Dumping structure for table crud.tokens
CREATE TABLE IF NOT EXISTS `tokens` (
  `token_id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(500) DEFAULT NULL,
  `client_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`token_id`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table crud.tokens: ~0 rows (approximately)
DELETE FROM `tokens`;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;

-- Dumping structure for table crud.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` varchar(100) NOT NULL DEFAULT '0',
  `email` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `birthday` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `qrkey` varchar(100) DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `qrkey` (`qrkey`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table crud.users: ~8 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `client_id`, `email`, `name`, `contact`, `birthday`, `address`, `town`, `province`, `password`, `qrkey`) VALUES
	(189, 'qwerqwe', 'test@gmail.com', 'asd', '09216630096', '10/23/20', '123', 'asd', 'asd', '$2b$10$RnLXmXE8d.ep1y7QzD.zo.C0v/BAWOnrNZFvZh/EzbgnZZg/sNX6.', 'eb993084-8860-4029-9b29-1827706e9d4b'),
	(206, '1e3157dd-07d7-4a4a-82b9-1339d9d96b27', 'rar@gmail.com', 'dasd', 'asd', '123', 'asdas', 'dsa', 'asd', '213', 'f05ffb71-00df-4f35-9cde-29c5408c1518'),
	(208, 'c1a19d12-b551-4da4-a9e1-b4a8a34468e5', 'iamcdgmx@gmail.com', 'asd', '09216630092', NULL, 'Block 2, Lot 10', 'Pavia', 'Iloilo', '123', '5910af3f-f57f-41b3-aa7e-96e02475acbd'),
	(209, '97babe84-b5db-4eb4-ae97-1fa80d58e25b', 'test2@gmail.com', 'test', '09216630092', NULL, 'Block 2, Lot 10', 'Pavia', 'Iloilo', '$2b$10$hZdFEbkL0By12fjTa3yoEO3tw3FX8qN09bC.Jzi93XP', '420fcb91-b6db-4ab2-99de-9160dc98a52a'),
	(210, 'bb75dca8-a500-4e1f-9d35-c94ed6df2fb6', 'test3@gmail.com', 'asd', '09216630092', NULL, 'Block 2, Lot 10', 'Pavia', 'Iloilo', '$2b$10$RnLXmXE8d.ep1y7QzD.zo.C0v/BAWOnrNZFvZh/EzbgnZZg/sNX6.', 'b8918e38-ddca-4907-8e6e-871b235499f0'),
	(212, 'df4fcfd5-2a04-44e9-8cfe-3587ff1b27a4', 'test4@gmail.com', '123', '09216630092', NULL, 'Block 2, Lot 10', 'Pavia', 'Iloilo', '$2b$10$vqTpolvKuxbLRd6Tho9JhubNr91efChL7vtvBPJ7tAy4RRmAwb.nu', 'ccce5559-3f65-4026-8676-d33c4d635bcf'),
	(213, '7c7fb0b7-a14a-4e8f-b25f-6e5622454909', 'test5@gmail.com', 'dasd', '09216630092', NULL, 'Block 2, Lot 10', 'Pavia', 'Iloilo', '$2b$10$LsW4mfIW0wvsV4rgu1ku7e0pFhYHo7RELs89oompKXMsG.pLl/dAm', 'fd432722-feb0-493b-8b9a-3f66f114dd31'),
	(214, 'c466334c-c8cd-4d2b-96ee-a30098afa507', 'dave@gmail.com', 'da', '09216630092', NULL, 'Block 2, Lot 10', 'Pavia', 'Iloilo', '$2b$10$YkkCCOyJDhG9n6ymlCWoYuqiCCHFUpgCKfCaMdmD7pl5ZJ8KRcF4u', 'ec639bc5-08f5-4e1c-ad70-e718d805b489'),
	(215, '11535cd5-9f36-4044-af57-470118af5c14', '123@gmail.com', 'asd', '12345678901', NULL, 'Block 2, Lot 10', 'Pavia', 'Iloilo', '$2b$10$gY0DpF3H5NNp2kAPU/4CS.xw1iS0HdNmyM534R9slLSiSQNWp58ty', '4c668f4a-1215-4a40-a0b9-e54131bf7edc'),
	(216, 'e447ed7d-3a82-41c2-a98b-117e24ebffaf', 'iamcdasddasasdxzcgmx@gmail.com', 'asd', '12345678901', NULL, 'Block 2, Lot 10', 'Pavia', 'Iloilo', '$2b$10$OzJi6JYNT4GEzw1MHVo83O5i1FWzUYHhOBqynwqdJpcPLRFsOeG/W', '75599e49-0445-40b7-b8ac-a6db4070f9e5');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
