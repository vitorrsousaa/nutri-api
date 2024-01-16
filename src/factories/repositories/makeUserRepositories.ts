import prisma from '../../app/shared/database/prisma';
import UserRepositories from '../../app/shared/database/repositories/user';

export function makeUserRepositories() {
  return new UserRepositories(prisma);
}
