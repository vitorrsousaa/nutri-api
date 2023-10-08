import { Router } from 'express';

import AuthModule from '../../module';

const signUpRoute = Router();

signUpRoute.post('/signUp', AuthModule.getController('signUp'));

export default signUpRoute;
