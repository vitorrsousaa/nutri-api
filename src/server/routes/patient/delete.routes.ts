import { Router } from 'express';

import { makeMiddlewareAuthorizationPatientModification } from '../../../factories/middlewares/makeMiddlewareAuthorizationPatientModification';
import { makeControllerDeletePatient } from '../../../factories/patient/controllers/makeControllerDeletePatient';
import { middlewareAdapter } from '../../adapters/middlewareAdapter';
import { routeAdapter } from '../../adapters/routeAdapter';

const deletePatientRoutes = Router();

deletePatientRoutes.delete(
  '/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Patient']
    // #swagger.description = 'Endpoint to delete patient'
    // #swagger.summary = 'Returns patient deleted'

    /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'Patient id to delete',
    required: true,
    type: 'string',
  }
  */

    /* #swagger.responses[204] = {
    description: "Patient deleted successfully." } */

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
  routeAdapter(makeControllerDeletePatient())
);

export default deletePatientRoutes;
