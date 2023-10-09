import { Router } from 'express';

import signInRoute from './signIn.routes';
import signUpRoute from './signUp.routes';

const authRoutes = Router();

authRoutes.use('/auth', signUpRoute);
authRoutes.use('/auth', signInRoute);

export default authRoutes;
