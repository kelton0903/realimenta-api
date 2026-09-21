import { Router, Request, Response } from "express";
import { TechnologyRepository } from "../repositories/technology.repository";
import { CreateTechnologyDTO } from "../schemas/technology.schema";
import { validate } from "../middlewares/validate.middleware";

export const technologyRoutes = Router();

// POST /api/technologies
technologyRoutes.post("/", validate(CreateTechnologyDTO), async (req: Request, res: Response) => {
  try {
    const technology = await TechnologyRepository.create(req.body);
    return res.status(201).json(technology);
  } catch {
    return res.status(400).json({ error: "Tecnologia já cadastrada ou dados inválidos" });
  }
});

// GET /api/technologies
technologyRoutes.get("/", async (_req: Request, res: Response) => {
  const technologies = await TechnologyRepository.findAll();
  return res.json(technologies);
});
