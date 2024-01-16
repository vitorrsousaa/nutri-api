import { Router } from 'express';

import { makeCreateAnamnesisController } from '../../../factories/anamnesis/controllers/makeCreateAnamnesisController';
import { routeAdapter } from '../../adapters/routeAdapter';

const createAnamnesisRoutes = Router();

createAnamnesisRoutes.post(
  '/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Anamnesis Template']

    next();
  },
  routeAdapter(makeCreateAnamnesisController())
);

export default createAnamnesisRoutes;
