import { Router } from 'express';

import signUpRoute from './signUp.routes';

const authRoutes = Router();

authRoutes.use('/auth', signUpRoute);

export default authRoutes;
