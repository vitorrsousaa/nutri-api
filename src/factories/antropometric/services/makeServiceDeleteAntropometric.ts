import { makeRepositoryAntropometric } from '@godiet-factories/repositories/makeRepositoryAntropometric';

import DeleteAntropometricService from 'app/modules/Antropometric/services/DeleteAntropometric';

export function makeServiceDeleteAntropometric() {
  return new DeleteAntropometricService(makeRepositoryAntropometric());
}
