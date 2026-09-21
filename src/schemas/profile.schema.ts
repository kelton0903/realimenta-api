import { z } from "zod";

export const CreateProfileDTO = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Formato de e-mail inválido"),
  bio: z.string().optional(),
  website: z.string().url("A URL deve ser válida (ex: https://...)").optional(),
});

export type CreateProfileInput = z.infer<typeof CreateProfileDTO>;
