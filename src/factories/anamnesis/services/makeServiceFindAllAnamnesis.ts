import FindAllAnamnesisService from '../../../app/modules/Anamnesis/services/FindAllAnamnesis';
import { makeRepositoryAnamnesis } from '../repositories/makeRepositoryAnamnesis';

export function makeServiceFindAllAnamnesis() {
  return new FindAllAnamnesisService(makeRepositoryAnamnesis());
}
