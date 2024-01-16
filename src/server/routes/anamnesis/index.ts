import { Router } from 'express';

import createAnamnesisRoutes from './create.routes';
import findAllAnamnesisRoutes from './findAll.routes';
import updateAnamnesisRoutes from './update.routes';

const anamnesisRoutes = Router();

anamnesisRoutes.use('/anamnesis', createAnamnesisRoutes);
anamnesisRoutes.use('/anamnesis', findAllAnamnesisRoutes);
anamnesisRoutes.use('/anamnesis', updateAnamnesisRoutes);

export default anamnesisRoutes;
