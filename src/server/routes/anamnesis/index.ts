import { Router } from 'express';

import createAnamnesisRoutes from './create.routes';
import findAllAnamnesisRoutes from './findAll.routes';
import updateAnamnesisRoutes from './update.routes';

const anamnesisRoutes = Router();

anamnesisRoutes.use(createAnamnesisRoutes);
anamnesisRoutes.use(findAllAnamnesisRoutes);
anamnesisRoutes.use(updateAnamnesisRoutes);

export default anamnesisRoutes;
