import { Router } from 'express';

import recoverRoute from './recover.routes';

const userRoutes = Router();

userRoutes.use('/user', recoverRoute);

export default userRoutes;
