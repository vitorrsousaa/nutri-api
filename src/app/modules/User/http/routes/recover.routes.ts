import { Router } from 'express';

import authHandler from '../../../../shared/http/middlewares/authHandler';
import UserModule from '../../module';

const recoverRoute = Router();

//get
recoverRoute.get('/recover', authHandler, UserModule.getController('recover'));

export default recoverRoute;
