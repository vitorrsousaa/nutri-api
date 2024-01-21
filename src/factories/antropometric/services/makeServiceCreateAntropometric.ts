import { makeRepositoryAntropometric } from '@godiet-factories/repositories/makeRepositoryAntropometric';

import CreateAntropometricService from 'app/modules/Antropometric/services/CreateAntropometric';

export function makeServiceCreateAntropometric() {
  return new CreateAntropometricService(makeRepositoryAntropometric());
}
