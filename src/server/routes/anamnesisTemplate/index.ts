import { Router } from 'express';

import findAllRoutes from './findAll.routes';

const anamnesisTemplateRoutes = Router();

anamnesisTemplateRoutes.use('/anamnesis-template', findAllRoutes);

export default anamnesisTemplateRoutes;
