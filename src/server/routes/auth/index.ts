import { Router } from 'express';

import signInRoutes from './signIn.routes';
import signUpRoute from './signUp.routes';

const authRoutes = Router();

authRoutes.use('/auth', signUpRoute);
authRoutes.use('/auth', signInRoutes);

export default authRoutes;
