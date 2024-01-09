import FindAllAnamnesisTemplateByUser from '../../../app/modules/AnamnesisTemplate/services/FindAllByUser';
import prisma from '../../../app/shared/database/prisma';
import AnamnesisTemplateRepositories from '../../../app/shared/database/repositories/anamnesisTemplate';

export function makeFindAllAnamnesisTemplateByUserService() {
  return new FindAllAnamnesisTemplateByUser(
    new AnamnesisTemplateRepositories(prisma)
  );
}
