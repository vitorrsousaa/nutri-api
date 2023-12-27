import { Router } from 'express';

import AuthModule from '../../module';

const signInRoute = Router();

signInRoute.post(
  '/signIn',
  (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Endpoint to sign in'
    // #swagger.summary = 'Logs in a user and returns a JWT token'

    /*
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Credentials to sign in',
      required: true,
      schema: { $ref: "#/definitions/TUser" }
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
      #swagger.responses[404] = {
      description: "User not exists"
      }
     */

    next();
  },
  AuthModule.getController('signIn')
);

export default signInRoute;
