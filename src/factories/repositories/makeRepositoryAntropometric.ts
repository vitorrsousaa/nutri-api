import prisma from 'app/shared/database/prisma';
import AntropometricRepositories from 'app/shared/database/repositories/antropometric';

export function makeRepositoryAntropometric() {
  return new AntropometricRepositories(prisma);
}
