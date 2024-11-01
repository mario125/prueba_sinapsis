# Prueba técnica Fullstack Senior  - Backend Serverless

## Descripción

Este proyecto es un backend desarrollado utilizando Serverless Framework. Proporciona varias API para la gestión de clientes, usuarios y campañas, y está diseñado para funcionar con una base de datos MySQL.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v14.x o superior)  (se desarrollo con 18.13.0)
- [MySQL](https://www.mysql.com/) (instalado y configurado)
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/) (instalado globalmente)
- Credenciales IAM de AWS configuradas si deseas publicar en producción.

## Endpoints

Aquí hay una lista de los endpoints disponibles:

- **POST** `https://k6jiva8trk.execute-api.us-east-1.amazonaws.com/registerCustomer`
- **POST** `https://k6jiva8trk.execute-api.us-east-1.amazonaws.com/registerUser`
- **GET** `https://99zox9pbpi.execute-api.us-east-1.amazonaws.com/dev/getCustomerAll`
- **GET** `https://99zox9pbpi.execute-api.us-east-1.amazonaws.com/dev/getUserAll`
- **POST** `https://99zox9pbpi.execute-api.us-east-1.amazonaws.com/dev/getUserId`
- **POST** `https://99zox9pbpi.execute-api.us-east-1.amazonaws.com/dev/createCampaigns`
- **POST** `https://99zox9pbpi.execute-api.us-east-1.amazonaws.com/dev/campaigns/{id}/simulate`
- **GET** `https://99zox9pbpi.execute-api.us-east-1.amazonaws.com/dev/campaignsList`
- **GET** `https://99zox9pbpi.execute-api.us-east-1.amazonaws.com/dev/messagesList`

## Rutas Locales

Cuando el servidor se ejecuta localmente, los endpoints son accesibles a través de las siguientes rutas:

- **POST** `http://localhost:3000/registerCustomer`
- **POST** `http://localhost:3000/registerUser`
- **GET** `http://localhost:3000/dev/getCustomerAll`
- **GET** `http://localhost:3000/dev/getUserAll`
- **POST** `http://localhost:3000/dev/getUserId`
- **POST** `http://localhost:3000/dev/createCampaigns`
- **POST** `http://localhost:3000/dev/campaigns/{id}/simulate`
- **GET** `http://localhost:3000/dev/campaignsList`
- **GET** `http://localhost:3000/dev/messagesList`

## Documentación de la API

La documentación de OpenAPI está disponible en:

- **http://localhost:4000/api-docs/**

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/mario125/prueba_sinapsis.git
   cd prueba_sinapsis/backend_sinapsis
   ```

2. **Instalar las dependencias**

   ```bash
   npm install
   ```

3. **Configurar la base de datos MySQL**

   Asegúrate de tener MySQL instalado y funcionando en tu máquina. Luego, importa la consulta SQL proporcionada para crear la estructura de la base de datos. Aquí está la estructura de la base de datos:

   ```sql
   -- Tabla campaigns
   DROP TABLE IF EXISTS `campaigns`;
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

   -- Tabla customers
   DROP TABLE IF EXISTS `customers`;
   CREATE TABLE `customers` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `name` varchar(255) DEFAULT NULL,
     `status` varchar(255) DEFAULT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `customers_name` (`name`)
   ) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

   -- Tabla messages
   DROP TABLE IF EXISTS `messages`;
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
     CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
   ) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

   -- Tabla users
   DROP TABLE IF EXISTS `users`;
   CREATE TABLE `users` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `customer_id` int(11) DEFAULT NULL,
     `username` varchar(255) NOT NULL,
     `status` varchar(255) NOT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `users_customer_id_username` (`customer_id`,`username`),
     CONSTRAINT `users_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
   ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
   ```

4. **Configurar Variables de Entorno**

   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

   ```env
   DB_HOST=""
   DB_NAME=""
   DB_USER=""
   DB_PASS=""
   ```

   Reemplaza los valores de las variables con los adecuados para tu entorno de base de datos.

## Comandos para el Desarrollo

Utiliza los siguientes comandos para trabajar con el proyecto:

- **Generar la documentación Swagger**

   ```bash
   npm run swagger
   ```

   Este comando generará la documentación API utilizando Swagger.

- **Sincronizar la base de datos**

   ```bash
   npm run sync-db
   ```

   Este comando sincroniza tu base de datos con el modelo definido en el proyecto.

- **Levantamiento del servidor en modo desarrollo**

   ```bash
   npm run dev
   ```

   Este comando inicia el servidor en modo desarrollo usando Serverless Offline, permitiendo pruebas locales.

- **Desplegar en AWS**

   ```bash
   npm run deploy
   ```

   Este comando desplegará tu aplicación en AWS utilizando Serverless Framework.

- **Eliminar los recursos de AWS**

   ```bash
   npm run remove
   ```

   Este comando eliminará los recursos desplegados en AWS para el entorno de desarrollo.

- **Ejecutar pruebas**

   ```bash
   npm run test
   ```

   Este comando ejecutará las pruebas definidas en el proyecto utilizando Jest.

## Notas Adicionales

- Asegúrate de tener las credenciales correctas de la base de datos antes de ejecutar el servidor.
- Para un funcionamiento óptimo, verifica la versión de Node.js y las dependencias en el archivo `package.json`.

## Autor

Mario Choquetaipe

## Licencia

Este proyecto está bajo la Licencia ISC.