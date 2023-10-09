import { Router } from 'express';

import AuthModule from '../../module';

const signInRoute = Router();

signInRoute.post('/signIn', AuthModule.getController('signIn'));

export default signInRoute;
