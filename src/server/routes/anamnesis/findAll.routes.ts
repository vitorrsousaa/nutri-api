import { Router } from 'express';

import { makeControllerFindAllAnamnesis } from '../../../factories/anamnesis/controllers/makeControllerFindAllAnamnesis';
import { routeAdapter } from '../../adapters/routeAdapter';

const findAllAnamnesisRoutes = Router();

findAllAnamnesisRoutes.get(
  '/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Anamnesis Template']

    next();
  },
  routeAdapter(makeControllerFindAllAnamnesis())
);

export default findAllAnamnesisRoutes;
