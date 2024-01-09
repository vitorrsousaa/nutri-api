import { type Prisma, PrismaClient } from '@prisma/client';

export default class AnamnesisTemplateRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createAnamnesisTemplateDTO: Prisma.AnamnesisTemplateCreateArgs) {
    return this.prismaService.anamnesisTemplate.create(
      createAnamnesisTemplateDTO
    );
  }
}
