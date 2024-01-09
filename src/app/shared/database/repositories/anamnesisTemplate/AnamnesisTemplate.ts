import { type Prisma, PrismaClient } from '@prisma/client';

export default class AnamnesisTemplateRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createAnamnesisTemplateDTO: Prisma.AnamnesisTemplateCreateArgs) {
    return this.prismaService.anamnesisTemplate.create(
      createAnamnesisTemplateDTO
    );
  }

  async createMany(
    createManyAnamnesisTemplateDTO: Prisma.AnamnesisTemplateCreateManyArgs
  ) {
    return this.prismaService.anamnesisTemplate.createMany(
      createManyAnamnesisTemplateDTO
    );
  }

  async findMany(
    findManyAnamnesisTemplateArgs: Prisma.AnamnesisTemplateFindManyArgs
  ) {
    return this.prismaService.anamnesisTemplate.findMany(
      findManyAnamnesisTemplateArgs
    );
  }
}
