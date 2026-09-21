import { Router, Request, Response } from "express";
import { ProjectRepository } from "../repositories/project.repository";
import { ProfileRepository } from "../repositories/profile.repository";
import { CreateProjectDTO } from "../schemas/project.schema";
import { validate } from "../middlewares/validate.middleware";

export const projectRoutes = Router();

// POST /api/projects
projectRoutes.post("/", validate(CreateProjectDTO), async (req: Request, res: Response) => {
  const profile = await ProfileRepository.findById(req.body.profileId);
  if (!profile) {
    return res.status(404).json({ error: "Perfil associado não encontrado" });
  }

  const project = await ProjectRepository.create(req.body);
  return res.status(201).json(project);
});

// GET /api/projects
projectRoutes.get("/", async (_req: Request, res: Response) => {
  const projects = await ProjectRepository.findAll();
  return res.json(projects);
});
