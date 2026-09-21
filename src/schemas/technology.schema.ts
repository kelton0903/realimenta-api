import { z } from "zod";

export const CreateTechnologyDTO = z.object({
  name: z.string().min(2, "Nome da tecnologia/categoria deve ter no mínimo 2 caracteres"),
  description: z.string().optional(),
});

export type CreateTechnologyInput = z.infer<typeof CreateTechnologyDTO>;
