import { type Prisma, PrismaClient } from '@prisma/client';

class PatientRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createDTO: Prisma.PatientCreateArgs) {
    return this.prismaService.patient.create(createDTO);
  }

  async findByEmail(email: string) {
    return this.prismaService.patient.findFirst({
      where: {
        email,
      },
    });
  }

  async findUnique(findUniqueDTO: Prisma.PatientFindUniqueArgs) {
    return this.prismaService.patient.findUnique(findUniqueDTO);
  }
}

export default PatientRepositories;
