import { prisma } from "../database/prisma";
import { CreateProjectInput } from "../schemas/project.schema";

export class ProjectRepository {
  static async create(data: CreateProjectInput) {
    const { title, description, profileId, technologyIds } = data;

    return prisma.project.create({
      data: {
        title,
        description,
        profileId,
        technologies: {
          connect: technologyIds.map((id) => ({ id }))
        }
      },
      include: {
        technologies: true,
        profile: true
      }
    });
  }

  static async findAll() {
    return prisma.project.findMany({
      include: {
        profile: true,
        technologies: true,
        feedbacks: true
      }
    });
  }
}
