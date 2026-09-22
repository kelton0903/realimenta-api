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
        url: "https://realimenta-api.onrender.com",
        description: "Servidor de Produção (Render)",
      },
      {
        url: "http://localhost:3000",
        description: "Ambiente Local",
      },
    ],
    paths: {
      "/api/projects": {
        get: {
          summary: "Listar projetos (com paginação e filtro)",
          tags: ["Projetos"],
          parameters: [
            { name: "page", in: "query", schema: { type: "integer", default: 1 }, description: "Página atual" },
            { name: "limit", in: "query", schema: { type: "integer", default: 10 }, description: "Itens por página" },
            { name: "technologyId", in: "query", schema: { type: "integer" }, description: "ID da tecnologia para filtro" },
          ],
          responses: {
            200: { description: "Lista paginada de projetos retornada com sucesso." },
          },
        },
        post: {
          summary: "Cadastrar novo projeto",
          tags: ["Projetos"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "description", "profileId"],
                  properties: {
                    title: { type: "string", example: "Lote de Frutas Orgânicas" },
                    description: { type: "string", example: "Doação para distribuição imediata" },
                    repositoryUrl: { type: "string", example: "https://github.com/exemplo" },
                    liveUrl: { type: "string", example: "https://exemplo.com" },
                    profileId: { type: "integer", example: 1 },
                    technologyIds: { type: "array", items: { type: "integer" }, example: [1] },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Projeto cadastrado com sucesso." },
            400: { description: "Erro de validação." },
          },
        },
      },
      "/api/projects/{id}/upvote": {
        put: {
          summary: "Incrementar curtida/estrela no projeto",
          tags: ["Projetos"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" }, description: "ID do projeto" },
          ],
          responses: {
            200: { description: "Upvote registrado com sucesso." },
            404: { description: "Projeto não encontrado." },
          },
        },
      },
      "/api/projects/{id}/feedbacks": {
        post: {
          summary: "Cadastrar avaliação (nota de 1 a 5) e recalcular média",
          tags: ["Projetos"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" }, description: "ID do projeto" },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["rating", "comment"],
                  properties: {
                    rating: { type: "number", minimum: 1, maximum: 5, example: 5 },
                    comment: { type: "string", example: "Excelente projeto de impacto social!" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Feedback criado e média recalculada." },
            400: { description: "Nota fora do intervalo ou comentário vazio." },
            404: { description: "Projeto não encontrado." },
          },
        },
      },
      "/api/profiles": {
        post: {
          summary: "Cadastrar perfil",
          tags: ["Perfis"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "bio"],
                  properties: {
                    name: { type: "string", example: "Doador Parceiro" },
                    email: { type: "string", example: "contato@parceiro.org" },
                    bio: { type: "string", example: "Instituição de apoio alimentar" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Perfil criado com sucesso." },
          },
        },
      },
      "/api/profiles/{id}": {
        get: {
          summary: "Buscar perfil por ID",
          tags: ["Perfis"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" }, description: "ID do perfil" },
          ],
          responses: {
            200: { description: "Perfil encontrado." },
            404: { description: "Perfil não encontrado." },
          },
        },
      },
      "/api/technologies": {
        get: {
          summary: "Listar tecnologias",
          tags: ["Tecnologias"],
          responses: {
            200: { description: "Lista de tecnologias retornada." },
          },
        },
        post: {
          summary: "Cadastrar tecnologia",
          tags: ["Tecnologias"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name"],
                  properties: {
                    name: { type: "string", example: "Hortifruti" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Tecnologia cadastrada com sucesso." },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);
