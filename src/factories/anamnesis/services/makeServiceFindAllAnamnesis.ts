import FindAllAnamnesisService from '../../../app/modules/Anamnesis/services/FindAllAnamnesis';
import { makeValidatePatientOwnershipService } from '../../patient/services/makeValidatePatientOwnershipService';
import { makeRepositoryAnamnesis } from '../repositories/makeRepositoryAnamnesis';

export function makeServiceFindAllAnamnesis() {
  return new FindAllAnamnesisService(
    makeRepositoryAnamnesis(),
    makeValidatePatientOwnershipService()
  );
}
