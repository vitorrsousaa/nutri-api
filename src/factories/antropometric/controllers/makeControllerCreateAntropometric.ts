import CreateController from 'app/modules/Antropometric/controllers/Create';

import { makeServiceCreateAntropometric } from '../services/makeServiceCreateAntropometric';

export function makeControllerCreateAntropometric() {
  return new CreateController(makeServiceCreateAntropometric());
}
