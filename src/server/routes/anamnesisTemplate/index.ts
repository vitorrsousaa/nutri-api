import { Router } from 'express';

import findAllRoutes from './findAll.routes';

const anamnesisTemplateRoutes = Router();

anamnesisTemplateRoutes.use(findAllRoutes);

export default anamnesisTemplateRoutes;
