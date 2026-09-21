import { prisma } from "../database/prisma";
import { CreateTechnologyInput } from "../schemas/technology.schema";

export class TechnologyRepository {
  static async create(data: CreateTechnologyInput) {
    return prisma.technology.create({ data });
  }

  static async findAll() {
    return prisma.technology.findMany();
  }
}
