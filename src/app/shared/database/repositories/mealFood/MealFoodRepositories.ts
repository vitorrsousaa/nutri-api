import { type Prisma, PrismaClient } from '@prisma/client';

export default class MealFoodRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createMealFoodDTO: Prisma.MealFoodCreateArgs) {
    return this.prismaService.mealFood.create(createMealFoodDTO);
  }

  async delete(deleteArgs: Prisma.MealFoodDeleteArgs) {
    return this.prismaService.mealFood.delete(deleteArgs);
  }
}
