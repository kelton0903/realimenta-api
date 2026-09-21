import { z } from "zod";

export const CreateFeedbackDTO = z.object({
  authorName: z.string().min(2, "Nome do autor deve ter no mínimo 2 caracteres"),
  comment: z.string().min(3, "Comentário deve ter no mínimo 3 caracteres"),
  rating: z.number().int().min(1, "A nota mínima é 1").max(5, "A nota máxima é 5"),
});

export type CreateFeedbackInput = z.infer<typeof CreateFeedbackDTO>;
