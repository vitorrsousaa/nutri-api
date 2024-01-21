import { Router } from 'express';

import createAntropometricRoutes from './create.routes';
import findAllAntropometricRoutes from './findAll.routes';

const antropometricRoutes = Router();

antropometricRoutes.use(createAntropometricRoutes);
antropometricRoutes.use(findAllAntropometricRoutes);

export default antropometricRoutes;
