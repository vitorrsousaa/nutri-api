import { Router } from 'express';

import PlanningMealModule from '../../module';

const deletePlanningMealRoutes = Router();

deletePlanningMealRoutes.delete(
  '/:id',
  (req, res, next) => {
    // #swagger.tags = ['Planning Meal']
    // #swagger.description = 'Endpoint to create planning meal'
    // #swagger.summary = 'Returns planning meal created'

    /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'Patient id to create planning meal',
    required: true,
    type: 'string',
  }
  */

    /* #swagger.parameters['planningMeal'] = {
    in: 'body',
    description: 'Planning meal information to create',
    required: true,
    type: 'object',
    schema: { $ref: "#/definitions/TCreatePlanningMeal" }
  }
  */

    /* #swagger.responses[200] = {
    schema: { "$ref": "#/definitions/TPlanningMeal" },
    description: "Planning meal created successfully." } */

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
  PlanningMealModule.getController('delete')
);

export default deletePlanningMealRoutes;
