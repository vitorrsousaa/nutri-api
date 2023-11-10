import { type Prisma, PrismaClient } from '@prisma/client';

export default class MealFoodRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createMealFoodArgs: Prisma.MealFoodCreateArgs) {
    return this.prismaService.mealFood.create(createMealFoodArgs);
  }

  async createMany(createManyMealFoodArgs: Prisma.MealFoodCreateManyArgs) {
    return this.prismaService.mealFood.createMany(createManyMealFoodArgs);
  }

  async delete(deleteArgs: Prisma.MealFoodDeleteArgs) {
    return this.prismaService.mealFood.delete(deleteArgs);
  }
}
