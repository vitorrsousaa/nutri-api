import { type Prisma, PrismaClient } from '@prisma/client';

export default class PlanningMealRepositores {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createPlanningMealDTO: Prisma.PlanningMealCreateArgs) {
    return this.prismaService.planningMeal.create(createPlanningMealDTO);
  }

  async findFirst(findFirstArgs: Prisma.PlanningMealFindFirstArgs) {
    return this.prismaService.planningMeal.findFirst(findFirstArgs);
  }

  async delete(deleteArgs: Prisma.PlanningMealDeleteArgs) {
    return this.prismaService.planningMeal.delete(deleteArgs);
  }
}
