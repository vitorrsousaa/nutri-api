import { Router } from 'express';

import { makeFindAllAnamnesisTemplateByUserController } from '../../../factories/anamnesisTemplate/controllers/makeFindAllAnamnesisTemplateByUserController';
import { routeAdapter } from '../../adapters/routeAdapter';

const findAllAnamnesisTemplateRoutes = Router();

findAllAnamnesisTemplateRoutes.get(
  '/',
  (req, res, next) => {
    // #swagger.tags = ['Anamnesis Template']

    next();
  },
  routeAdapter(makeFindAllAnamnesisTemplateByUserController())
);

export default findAllAnamnesisTemplateRoutes;
