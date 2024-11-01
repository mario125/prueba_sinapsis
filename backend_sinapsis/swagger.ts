import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app: Application = express();

// Cargar el archivo swagger.yaml
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

// Configurar Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de ejemplo
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenido a la API de Usuarios");
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
