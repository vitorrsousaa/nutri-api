import CreateAnamnesisService from '../../../app/modules/Anamnesis/services/CreateAnamnesis';
import prisma from '../../../app/shared/database/prisma';
import AnamnesisRepositories from '../../../app/shared/database/repositories/anamnesis';
import { makeValidatePatientOwnershipService } from '../../patient/services/makeValidatePatientOwnershipService';

export function makeCreateAnamnesisService() {
  const validatePatientOwnershipServiceInstance =
    makeValidatePatientOwnershipService();

  const anamnesisRepositoriesInstance = new AnamnesisRepositories(prisma);

  return new CreateAnamnesisService(
    validatePatientOwnershipServiceInstance,
    anamnesisRepositoriesInstance
  );
}
