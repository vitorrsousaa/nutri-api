import CreateAnamnesisService from '../../../app/modules/Anamnesis/services/CreateAnamnesis';
import prisma from '../../../app/shared/database/prisma';
import AnamnesisRepositories from '../../../app/shared/database/repositories/anamnesis';

export function makeCreateAnamnesisService() {
  const anamnesisRepositoriesInstance = new AnamnesisRepositories(prisma);

  return new CreateAnamnesisService(anamnesisRepositoriesInstance);
}
