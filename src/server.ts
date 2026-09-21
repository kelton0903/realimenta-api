console.log("[1/4] Carregando bibliotecas Express e Cors...");
import express from "express";
import cors from "cors";

console.log("[2/4] Carregando rotas da aplicacao...");
import { profileRoutes } from "./routes/profile.routes";
import { technologyRoutes } from "./routes/technology.routes";
import { projectRoutes } from "./routes/project.routes";

console.log("[3/4] Inicializando instancia do Express...");
const app = express();

app.use(cors());
app.use(express.json());

// Registro dos endpoints da especificacao
app.use("/api/profiles", profileRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/projects", projectRoutes);

const PORT = 3000;

console.log("[4/4] Abrindo porta " + PORT + "...");
app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 Servidor ReAlimenta rodando com sucesso!`);
  console.log(`🔗 Teste no navegador: http://localhost:${PORT}/api/technologies`);
  console.log(`=================================================\n`);
});
