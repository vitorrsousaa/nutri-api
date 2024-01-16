import { Router } from 'express';

const recoverRoute = Router();

import { makeControllerRecoverUser } from '../../../factories/user/controllers/makeControllerRecoverUser';
import { routeAdapter } from '../../adapters/routeAdapter';

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

  routeAdapter(makeControllerRecoverUser())
);

export default recoverRoute;
