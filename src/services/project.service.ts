import { prisma } from "../database/prisma";
import { CreateFeedbackInput } from "../schemas/feedback.schema";

export class ProjectService {
  // 1. Cadastrar Feedback e recalcular a média do projeto
  static async addFeedback(projectId: number, data: CreateFeedbackInput) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { feedbacks: true },
    });

    if (!project) {
      throw { status: 404, message: "Projeto não encontrado" };
    }

    // Cria o feedback
    const feedback = await prisma.feedback.create({
      data: {
        authorName: data.authorName,
        comment: data.comment,
        rating: data.rating,
        projectId,
      },
    });

    // Recalcula a nota média com todos os feedbacks (incluindo o novo)
    const allRatings = [...project.feedbacks.map((f) => f.rating), data.rating];
    const sum = allRatings.reduce((acc, curr) => acc + curr, 0);
    const averageRating = Number((sum / allRatings.length).toFixed(1));

    // Atualiza o projeto com a nova média
    await prisma.project.update({
      where: { id: projectId },
      data: { averageRating },
    });

    return { feedback, averageRating };
  }

  // 2. Incrementar upvotes (curtidas/estrelas)
  static async incrementUpvote(projectId: number) {
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      throw { status: 404, message: "Projeto não encontrado" };
    }

    return prisma.project.update({
      where: { id: projectId },
      data: {
        upvotes: { increment: 1 },
      },
    });
  }

  // 3. Listagem com paginação e filtro por tecnologia
  static async listProjects(page = 1, limit = 10, technologyId?: number) {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (technologyId) {
      where.technologies = {
        some: { id: technologyId },
      };
    }

    const [total, projects] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        include: {
          profile: true,
          technologies: true,
          feedbacks: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      data: projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
