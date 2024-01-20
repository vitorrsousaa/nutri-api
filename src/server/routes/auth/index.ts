import { Router } from 'express';

import signInRoutes from './signIn.routes';
import signUpRoute from './signUp.routes';

const authRoutes = Router();

authRoutes.use(signUpRoute);
authRoutes.use(signInRoutes);

export default authRoutes;
