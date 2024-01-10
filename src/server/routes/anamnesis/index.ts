import { Router } from 'express';

import createAnamnesisRoutes from './create.routes';
import findAllAnamnesisRoutes from './findAll.routes';

const anamnesisRoutes = Router();

anamnesisRoutes.use('/anamnesis', createAnamnesisRoutes);
anamnesisRoutes.use('/anamnesis', findAllAnamnesisRoutes);

export default anamnesisRoutes;
