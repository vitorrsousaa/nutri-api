import { type Prisma, PrismaClient } from '@prisma/client';

class UserRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createDTO: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createDTO);
  }

  async findUnique(findUniqueDTO: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(findUniqueDTO);
  }
}

export default UserRepositories;
