import { Router } from 'express';

import { makeControllerSignUp } from '../../../factories/auth/controllers/makeControllerSignUp';
import { routeAdapter } from '../../adapters/routeAdapter';

const signUpRoutes = Router();

signUpRoutes.post(
  '/signUp',
  (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Endpoint to sign up'

    // #swagger.summary = 'Register user and returns a JWT token'

    /*
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Information about user to sign up',
      required: true,
      schema: { $ref: "#/definitions/TUserCreate" }
    }
    */

    /* #swagger.responses[200] = {
      schema: { "$ref": "#/definitions/TUserResponse" },
      description: "User logged successfully." } */

    /* #swagger.responses[400] = {
      schema: { "$ref": "#/definitions/ErrorFieldResponse" },
      description: "Missing fields or invalid fields." }
      */

    /**
      #swagger.responses[400] = {
      description: "Email already in use"
      }
     */

    next();
  },
  routeAdapter(makeControllerSignUp())
);

export default signUpRoutes;
