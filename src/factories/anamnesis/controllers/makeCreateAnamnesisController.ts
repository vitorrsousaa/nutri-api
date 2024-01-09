import CreateAnamnesisController from '../../../app/modules/Anamnesis/controller/CreateAnamnesis';
import { makeCreateAnamnesisService } from '../services/makeCreateAnamnesisService';

export function makeCreateAnamnesisController() {
  return new CreateAnamnesisController(makeCreateAnamnesisService());
}
