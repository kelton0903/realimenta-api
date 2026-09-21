import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("❌ Erro capturado:", err);

  // Erros manuais com status code definido
  if (err.status && err.message) {
    return res.status(err.status).json({
      status: "error",
      statusCode: err.status,
      message: err.message,
    });
  }

  // Erros comuns de requisição ou tipos
  if (err.name === "SyntaxError") {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "JSON mal formatado na requisição.",
    });
  }

  // Fallback para 500
  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Ocorreu um erro interno no servidor.",
  });
};
