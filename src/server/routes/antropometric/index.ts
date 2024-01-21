import { Router } from 'express';

import createAntropometricRoutes from './create.routes';

const antropometricRoutes = Router();

antropometricRoutes.use(createAntropometricRoutes);

export default antropometricRoutes;
