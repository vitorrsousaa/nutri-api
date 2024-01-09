import { Router } from 'express';

import createAnamnesisRoutes from './create.routes';

const anamnesisRoutes = Router();

anamnesisRoutes.use('/anamnesis', createAnamnesisRoutes);

export default anamnesisRoutes;
