const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // Para cargar el archivo YAML

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml'); // Carga tu especificación OpenAPI

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Tus rutas y controladores van aquí

app.listen(4000, () => {
    console.log('Servidor escuchando en el puerto 4000');
});
