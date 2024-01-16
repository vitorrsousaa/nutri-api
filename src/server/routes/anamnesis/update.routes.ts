import { Router } from 'express';

import { makeControllerUpdateAnamnesis } from '../../../factories/anamnesis/controllers/makeControllerUpdateAnamnesis';
import { routeAdapter } from '../../adapters/routeAdapter';

const updateAnamnesisRoutes = Router();

updateAnamnesisRoutes.put(
  '/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Anamnesis Template']

    next();
  },
  routeAdapter(makeControllerUpdateAnamnesis())
);

export default updateAnamnesisRoutes;
