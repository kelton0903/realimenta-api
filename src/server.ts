import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { profileRoutes } from "./routes/profile.routes";
import { technologyRoutes } from "./routes/technology.routes";
import { projectRoutes } from "./routes/project.routes";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

// Rota da documentação interativa Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz amigável
app.get("/", (_req, res) => {
  res.json({
    name: "ReAlimenta API",
    status: "online",
    docs: "/api-docs",
  });
});

// Endpoints da API
app.use("/api/profiles", profileRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/projects", projectRoutes);

// Manipulador Global de Erros (deve ser o último middleware registrado)
app.use(globalErrorHandler);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📖 Documentação Swagger em: http://localhost:${PORT}/api-docs`);
});
