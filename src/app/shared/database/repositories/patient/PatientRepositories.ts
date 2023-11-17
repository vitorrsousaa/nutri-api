import { type Prisma, PrismaClient } from '@prisma/client';

class PatientRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createArgs: Prisma.PatientCreateArgs) {
    return this.prismaService.patient.create(createArgs);
  }

  async findAll(findAllArgs: Prisma.PatientFindManyArgs) {
    return this.prismaService.patient.findMany(findAllArgs);
  }

  async findByEmail(email: string) {
    return this.prismaService.patient.findFirst({
      where: {
        email,
      },
    });
  }

  async findFirst(findFirstArgs: Prisma.PatientFindFirstArgs) {
    return this.prismaService.patient.findFirst(findFirstArgs);
  }

  async findUnique(findUniqueArgs: Prisma.PatientFindUniqueArgs) {
    return this.prismaService.patient.findUnique(findUniqueArgs);
  }

  async delete(deleteArgs: Prisma.PatientDeleteArgs) {
    return this.prismaService.patient.delete(deleteArgs);
  }
}

export default PatientRepositories;
