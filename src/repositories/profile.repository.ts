import { prisma } from "../database/prisma";
import { CreateProfileInput } from "../schemas/profile.schema";

export class ProfileRepository {
  static async create(data: CreateProfileInput) {
    return prisma.profile.create({ data });
  }

  static async findById(id: number) {
    return prisma.profile.findUnique({
      where: { id },
      include: {
        projects: {
          include: { technologies: true, feedbacks: true }
        }
      }
    });
  }

  static async findByEmail(email: string) {
    return prisma.profile.findUnique({ where: { email } });
  }
}
