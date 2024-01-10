import prisma from '../../../app/shared/database/prisma';
import AnamnesisRepositories from '../../../app/shared/database/repositories/anamnesis';

export function makeRepositoryAnamnesis() {
  return new AnamnesisRepositories(prisma);
}
