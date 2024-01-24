import DeleteAntropometricController from 'app/modules/Antropometric/controllers/DeleteAntropometric';

import { makeServiceDeleteAntropometric } from '../services/makeServiceDeleteAntropometric';

export function makeControllerDeleteAntropometric() {
  return new DeleteAntropometricController(makeServiceDeleteAntropometric());
}
