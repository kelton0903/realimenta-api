import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ReAlimenta / DevShowcase API",
      version: "2.0.0",
      description:
        "Documentação oficial da API ReAlimenta para conexão e distribuição segura de excedentes alimentares (UAPI / UESPI).",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Ambiente Local",
      },
      {
        url: "https://realimenta-api.onrender.com",
        description: "Servidor de Produção (Render)",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
