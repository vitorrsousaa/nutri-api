import FindAllAnamnesisController from '../../../app/modules/Anamnesis/controller/FindAllAnamnesis';
import { makeServiceFindAllAnamnesis } from '../services/makeServiceFindAllAnamnesis';

export function makeControllerFindAllAnamnesis() {
  return new FindAllAnamnesisController(makeServiceFindAllAnamnesis());
}
