import { Router } from 'express';

import PatientModule from '../../module';

const deletePatientRoutes = Router();

deletePatientRoutes.delete(
  '/:id',
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
  PatientModule.getController('delete')
);

export default deletePatientRoutes;
