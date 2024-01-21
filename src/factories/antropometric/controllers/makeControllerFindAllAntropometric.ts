import FindAllController from 'app/modules/Antropometric/controllers/FindAll';

import { makeServiceFindAllAntropometric } from '../services/makeServiceFindAllAntropometric';

export function makeControllerFindAllAntropometric() {
  return new FindAllController(makeServiceFindAllAntropometric());
}
