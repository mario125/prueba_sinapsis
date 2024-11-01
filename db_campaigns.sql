-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 161.132.38.51    Database: prueba_sinapsis
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.18-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaigns`
--

DROP TABLE IF EXISTS `campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaigns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `process_date` datetime DEFAULT NULL,
  `process_hour` time DEFAULT NULL,
  `process_status` int(11) DEFAULT NULL,
  `phone_list` varchar(255) DEFAULT NULL,
  `message_text` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `campaigns_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaigns`
--

LOCK TABLES `campaigns` WRITE;
/*!40000 ALTER TABLE `campaigns` DISABLE KEYS */;
INSERT INTO `campaigns` VALUES (2,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',3,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(3,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',3,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(4,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',3,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(5,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',3,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(6,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',1,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(7,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',3,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(8,1,'JJ','2024-11-02 00:00:00','12:00:00',3,'+1234567890|+0987654321|+1122334455|+51987654321','HOLA'),(9,1,'Campaña de Prueba','2022-12-31 00:00:00','12:00:00',3,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(10,1,'Campaña de Prueba','2022-12-31 00:00:00','12:00:00',1,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(11,1,'DEL 2024','2024-11-01 00:00:00','12:12:12',3,'+1234567890|+0987654321|+1122334455|+51987654321','DEL 2024'),(12,13,'CAMPAÑA PARA USUARIO TOP','2024-11-20 00:00:00','12:12:12',3,'+1234567890|+0987654321|+1122334455|+51987654321','CAMPAÑA PARA USUARIO TOP'),(13,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',1,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(14,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',1,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(15,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',1,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(16,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',1,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(17,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',1,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.'),(18,14,'nuevo 125','2024-11-07 00:00:00','12:12:12',3,'+51929863850','nuevo 125'),(19,1,'Campaña de Prueba','2023-01-01 00:00:00','12:00:00',1,'+1234567890|+0987654321|+1122334455|+51987654321','Este es un mensaje de prueba para la campaña.');
/*!40000 ALTER TABLE `campaigns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'mario','1'),(2,'Cliente Ejemplo','1'),(4,'nuevo ','1'),(5,'2','1'),(6,'6','0'),(7,'7','1'),(8,'8','1'),(9,'9','1'),(10,'10','1');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `campaign_id` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `shipping_status` int(11) DEFAULT NULL,
  `process_date` varchar(255) DEFAULT NULL,
  `process_hour` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campaign_id` (`campaign_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (33,2,'+0987654321','Este es un mensaje de prueba para la campaña.',2,'2024-10-31 04:09:09','23:09:09'),(34,2,'+1234567890','Este es un mensaje de prueba para la campaña.',3,'2024-10-31 04:09:09','23:09:09'),(35,2,'+51987654321','Este es un mensaje de prueba para la campaña.',3,'2024-10-31 04:09:09','23:09:09'),(36,2,'+1122334455','Este es un mensaje de prueba para la campaña.',2,'2024-10-31 04:09:09','23:09:09'),(37,2,'+1234567890','Este es un mensaje de prueba para la campaña.',2,'2024-10-30 23:12:51','23:12:51'),(38,2,'+0987654321','Este es un mensaje de prueba para la campaña.',3,'2024-10-30 23:12:51','23:12:51'),(39,2,'+51987654321','Este es un mensaje de prueba para la campaña.',3,'2024-10-30 23:12:51','23:12:51'),(40,2,'+1122334455','Este es un mensaje de prueba para la campaña.',2,'2024-10-30 23:12:51','23:12:51'),(41,8,'+1234567890','HOLA',2,'2024-11-01 03:50:30','03:50:30'),(42,8,'+0987654321','HOLA',3,'2024-11-01 03:50:30','03:50:30'),(43,8,'+1122334455','HOLA',3,'2024-11-01 03:50:30','03:50:30'),(44,8,'+51987654321','HOLA',3,'2024-11-01 03:50:30','03:50:30'),(45,3,'+1234567890','Este es un mensaje de prueba para la campaña.',2,'2024-11-01 04:00:46','04:00:46'),(46,3,'+0987654321','Este es un mensaje de prueba para la campaña.',2,'2024-11-01 04:00:46','04:00:46'),(47,3,'+51987654321','Este es un mensaje de prueba para la campaña.',2,'2024-11-01 04:00:46','04:00:46'),(48,3,'+1122334455','Este es un mensaje de prueba para la campaña.',3,'2024-11-01 04:00:46','04:00:46'),(49,4,'+0987654321','Este es un mensaje de prueba para la campaña.',2,'2024-11-01 04:18:57','04:18:57'),(50,4,'+1234567890','Este es un mensaje de prueba para la campaña.',3,'2024-11-01 04:18:57','04:18:57'),(51,4,'+1122334455','Este es un mensaje de prueba para la campaña.',2,'2024-11-01 04:18:57','04:18:57'),(52,4,'+51987654321','Este es un mensaje de prueba para la campaña.',2,'2024-11-01 04:18:57','04:18:57'),(53,5,'+1234567890','Este es un mensaje de prueba para la campaña.',3,'2024-11-01 04:25:58','04:25:58'),(54,5,'+0987654321','Este es un mensaje de prueba para la campaña.',3,'2024-11-01 04:25:58','04:25:58'),(55,5,'+1122334455','Este es un mensaje de prueba para la campaña.',2,'2024-11-01 04:25:58','04:25:58'),(56,5,'+51987654321','Este es un mensaje de prueba para la campaña.',3,'2024-11-01 04:25:58','04:25:58'),(57,7,'+1234567890','Este es un mensaje de prueba para la campaña.',2,'2024-11-01 04:46:55','04:46:55'),(58,7,'+0987654321','Este es un mensaje de prueba para la campaña.',2,'2024-11-01 04:46:55','04:46:55'),(59,7,'+1122334455','Este es un mensaje de prueba para la campaña.',3,'2024-11-01 04:46:55','04:46:55'),(60,7,'+51987654321','Este es un mensaje de prueba para la campaña.',2,'2024-11-01 04:46:55','04:46:55'),(61,11,'+0987654321','DEL 2024',2,'2024-11-01 05:21:16','05:21:16'),(62,11,'+1234567890','DEL 2024',2,'2024-11-01 05:21:16','05:21:16'),(63,11,'+1122334455','DEL 2024',3,'2024-11-01 05:21:16','05:21:16'),(64,11,'+51987654321','DEL 2024',2,'2024-11-01 05:21:16','05:21:16'),(65,12,'+1234567890','CAMPAÑA PARA USUARIO TOP',3,'2024-11-01 05:41:41','05:41:41'),(66,12,'+0987654321','CAMPAÑA PARA USUARIO TOP',2,'2024-11-01 05:41:41','05:41:41'),(67,12,'+1122334455','CAMPAÑA PARA USUARIO TOP',3,'2024-11-01 05:41:41','05:41:41'),(68,12,'+51987654321','CAMPAÑA PARA USUARIO TOP',2,'2024-11-01 05:41:41','05:41:41'),(69,18,'+51929863850','nuevo 125',3,'2024-11-01 07:01:30','07:01:30');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_customer_id_username` (`customer_id`,`username`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'mario','1'),(2,1,'nuevoUsuario','0'),(5,1,'nuevoUsuario 125','1'),(8,1,'nuevoUsuario 125--','0'),(12,10,'usuario10','1'),(13,1,'USUARIO TOP','1'),(14,1,'nuevo usuario 125','1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'prueba_sinapsis'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-01  7:18:37
