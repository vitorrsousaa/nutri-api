import { makeRepositoryAntropometric } from '@godiet-factories/repositories/makeRepositoryAntropometric';

import FindAllAntropometricService from 'app/modules/Antropometric/services/FindAllAntropometric';

export function makeServiceFindAllAntropometric() {
  return new FindAllAntropometricService(makeRepositoryAntropometric());
}
