import { Router } from 'express';

import recoverRoute from './recover.routes';

const userRoutes = Router();

userRoutes.use(recoverRoute);

export default userRoutes;
