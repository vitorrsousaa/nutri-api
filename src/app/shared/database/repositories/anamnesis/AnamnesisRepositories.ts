import { type Prisma, PrismaClient } from '@prisma/client';

export default class AnamnesisRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createAnamnesisDTO: Prisma.AnamnesisCreateArgs) {
    return this.prismaService.anamnesis.create(createAnamnesisDTO);
  }
}
