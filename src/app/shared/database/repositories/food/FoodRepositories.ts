import { type Prisma, PrismaClient } from '@prisma/client';

class FoodRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async findAll(findAllArgs: Prisma.FoodFindManyArgs) {
    return this.prismaService.food.findMany(findAllArgs);
  }
}

export default FoodRepositories;
