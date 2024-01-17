import prisma from '../../app/shared/database/prisma';
import UserRepositories from '../../app/shared/database/repositories/user';

export function makeRepositoryUser() {
  return new UserRepositories(prisma);
}
