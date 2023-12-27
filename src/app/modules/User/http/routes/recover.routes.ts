import { Router } from 'express';

import UserModule from '../../module';

const recoverRoute = Router();

//get
recoverRoute.get(
  '/recover',
  (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to recover user'
    // #swagger.summary = 'Returns user recovered'

    /* #swagger.responses[200] = {
      schema: { "$ref": "#/definitions/TUser" },
      description: "User recovered successfully." } */

    next();
  },
  UserModule.getController('recover')
);

export default recoverRoute;
