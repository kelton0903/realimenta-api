import { Router, Request, Response } from "express";
import { ProfileRepository } from "../repositories/profile.repository";
import { CreateProfileDTO } from "../schemas/profile.schema";
import { validate } from "../middlewares/validate.middleware";

export const profileRoutes = Router();

// POST /api/profiles
profileRoutes.post("/", validate(CreateProfileDTO), async (req: Request, res: Response) => {
  const existing = await ProfileRepository.findByEmail(req.body.email);
  if (existing) {
    return res.status(400).json({ error: "E-mail já cadastrado" });
  }

  const profile = await ProfileRepository.create(req.body);
  return res.status(201).json(profile);
});

// GET /api/profiles/:id
profileRoutes.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const profile = await ProfileRepository.findById(id);
  if (!profile) return res.status(404).json({ error: "Perfil não encontrado" });

  return res.json(profile);
});
