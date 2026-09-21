import { z } from "zod";

export const CreateProjectDTO = z.object({
  title: z.string().min(3, "O título do projeto é obrigatório e deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter no mínimo 10 caracteres"),
  profileId: z.number().int().positive("ID de perfil inválido"),
  technologyIds: z.array(z.number().int().positive()).optional().default([]),
});

export type CreateProjectInput = z.infer<typeof CreateProjectDTO>;
