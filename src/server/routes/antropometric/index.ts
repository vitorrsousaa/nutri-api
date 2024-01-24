import { Router } from 'express';

import createAntropometricRoutes from './create.routes';
import deleteAntropometricRoutes from './delete.routes';
import findAllAntropometricRoutes from './findAll.routes';

const antropometricRoutes = Router();

antropometricRoutes.use(createAntropometricRoutes);
antropometricRoutes.use(findAllAntropometricRoutes);
antropometricRoutes.use(deleteAntropometricRoutes);

export default antropometricRoutes;
