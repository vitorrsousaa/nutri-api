import { Router } from 'express';

import { makeControllerCreatePatient } from '../../../factories/patient/controllers/makeControllerCreatePatient';
import { routeAdapter } from '../../adapters/routeAdapter';

const createPatientRoutes = Router();

createPatientRoutes.post(
  '/create',
  (req, res, next) => {
    // #swagger.tags = ['Patient']
    // #swagger.description = 'Endpoint to create patient'
    // #swagger.summary = 'Returns patient created'

    /* #swagger.parameters['patient'] = {
    in: 'body',
    description: 'Patient information to create',
    required: true,
    type: 'object',
    schema: { $ref: "#/definitions/TCreatePatient" }
  }
  */

    /* #swagger.responses[200] = {
      schema: { "$ref": "#/definitions/TPatient" },
      description: "Patient created successfully." } */

    /* #swagger.responses[400] = {
      schema: { "$ref": "#/definitions/ErrorFieldResponse" },
      description: "Missing fields or invalid fields." }
    */

    /*
      #swagger.responses[404] = {
      description: "Email already in use"
      }
      */

    next();
  },
  routeAdapter(makeControllerCreatePatient())
);

export default createPatientRoutes;
