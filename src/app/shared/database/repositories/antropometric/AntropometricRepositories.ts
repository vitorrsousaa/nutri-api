import { type Prisma, PrismaClient } from '@prisma/client';

export default class AntropometricRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createAntropometricDTO: Prisma.AntropometricCreateArgs) {
    return this.prismaService.antropometric.create(createAntropometricDTO);
  }

  async findAll(findAllAntropometricArgs: Prisma.AntropometricFindManyArgs) {
    return this.prismaService.antropometric.findMany(findAllAntropometricArgs);
  }
}
