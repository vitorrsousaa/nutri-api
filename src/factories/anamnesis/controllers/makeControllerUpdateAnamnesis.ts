import UpdateAnamnesisController from '../../../app/modules/Anamnesis/controller/UpdateAnamnesis';
import { makeServiceUpdateAnamnesis } from '../services/makeServiceUpdateAnamnesis';

export function makeControllerUpdateAnamnesis() {
  return new UpdateAnamnesisController(makeServiceUpdateAnamnesis());
}
