import { Router } from 'express';

import PatientModule from '../../module';

const updatePatientRoutes = Router();

updatePatientRoutes.patch(
  '/update/:id',
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
  PatientModule.getController('update')
);

export default updatePatientRoutes;
