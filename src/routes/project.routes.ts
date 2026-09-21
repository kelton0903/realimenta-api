import { Router, Request, Response, NextFunction } from "express";
import { ProjectRepository } from "../repositories/project.repository";
import { ProfileRepository } from "../repositories/profile.repository";
import { CreateProjectDTO } from "../schemas/project.schema";
import { CreateFeedbackDTO } from "../schemas/feedback.schema";
import { ProjectService } from "../services/project.service";
import { validate } from "../middlewares/validate.middleware";

export const projectRoutes = Router();

// POST /api/projects
projectRoutes.post("/", validate(CreateProjectDTO), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await ProfileRepository.findById(req.body.profileId);
    if (!profile) {
      return res.status(404).json({ error: "Perfil associado não encontrado." });
    }
    const project = await ProjectRepository.create(req.body);
    return res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects (com paginação e filtro por tecnologia)
projectRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const technologyId = req.query.technologyId ? Number(req.query.technologyId) : undefined;

    const result = await ProjectService.listProjects(page, limit, technologyId);
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/projects/:id/feedbacks (Avaliar de 1 a 5 e atualizar média)
projectRoutes.post("/:id/feedbacks", validate(CreateFeedbackDTO), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = Number(req.params.id);
    if (isNaN(projectId)) {
      return res.status(400).json({ error: "ID de projeto inválido" });
    }

    const result = await ProjectService.addFeedback(projectId, req.body);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// PUT /api/projects/:id/upvote (Incrementar curtida/estrela)
projectRoutes.put("/:id/upvote", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = Number(req.params.id);
    if (isNaN(projectId)) {
      return res.status(400).json({ error: "ID de projeto inválido" });
    }

    const updated = await ProjectService.incrementUpvote(projectId);
    return res.json({ message: "Upvote registrado com sucesso", upvotes: updated.upvotes });
  } catch (err) {
    next(err);
  }
});
