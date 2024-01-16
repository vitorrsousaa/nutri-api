import UpdateAnamnesisService from '../../../app/modules/Anamnesis/services/UpdateAnamnesis';
import { makeRepositoryAnamnesis } from '../repositories/makeRepositoryAnamnesis';

export function makeServiceUpdateAnamnesis() {
  return new UpdateAnamnesisService(makeRepositoryAnamnesis());
}
