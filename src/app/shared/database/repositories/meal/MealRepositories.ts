import { type Prisma, PrismaClient } from '@prisma/client';

export default class MealRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createMealDTO: Prisma.MealCreateArgs) {
    return this.prismaService.meal.create(createMealDTO);
  }

  async findFirst(findFirstArgs: Prisma.MealFindFirstArgs) {
    return this.prismaService.meal.findFirst(findFirstArgs);
  }

  async findUnique(findUniqueArgs: Prisma.MealFindUniqueArgs) {
    return this.prismaService.meal.findUnique(findUniqueArgs);
  }

  async delete(deleteArgs: Prisma.MealDeleteArgs) {
    return this.prismaService.meal.delete(deleteArgs);
  }
}
