import { Router } from 'express';

import { makeMiddlewareAuthorizationPatientModification } from '../../../factories/middlewares/makeMiddlewareAuthorizationPatientModification';
import { makeControllerUpdatePatient } from '../../../factories/patient/controllers/makeControllerUpdatePatient';
import { middlewareAdapter } from '../../adapters/middlewareAdapter';
import { routeAdapter } from '../../adapters/routeAdapter';

const updatePatientRoutes = Router();

updatePatientRoutes.put(
  '/update/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Patient']
    // #swagger.description = 'Endpoint to update patient'
    // #swagger.summary = 'Returns patient updated'

    /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'Patient id to update',
    required: true,
    type: 'string',
  }
  */

    /* #swagger.parameters['patient'] = {
    in: 'body',
    description: 'Patient information to update',
    required: true,
    type: 'object',
    schema: { $ref: "#/definitions/TUpdatePatient" }
  }
  */

    /* #swagger.responses[200] = {
      schema: { "$ref": "#/definitions/TPatient" },
      description: "Patient updated successfully." } */

    /* #swagger.responses[400] = {
      schema: { "$ref": "#/definitions/ErrorFieldResponse" },
      description: "Missing fields or invalid fields." }
    */

    /*
      #swagger.responses[404] = {
      description: "Patient not found"
      }
      */

    next();
  },
  middlewareAdapter(makeMiddlewareAuthorizationPatientModification()),
  routeAdapter(makeControllerUpdatePatient())
);

export default updatePatientRoutes;
