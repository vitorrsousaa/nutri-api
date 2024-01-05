import { makeFindAllFoodController } from '@godiet-factories/food/controllers/makeFindAllFoodController';

import { Router } from 'express';

import { routeAdapter } from '../../adapters/routeAdapter';

const findAllFoodRoutes = Router();

findAllFoodRoutes.get(
  '/:origin',
  (req, res, next) => {
    // #swagger.tags = ['Food']
    // #swagger.description = 'Endpoint to find all food'
    // #swagger.summary = 'Returns all food'
    // #swagger.operationId = 'findAllFood'

    /*
  #swagger.parameters['origin'] = {
    in: 'path',
    description: 'Origin of food',
    required: true,
    type: 'enum',
    enum: ['TACO', 'CUSTOM']
  }
  */

    /* #swagger.responses[200] = {
      schema: { "$ref": "#/definitions/TFood" },
      description: "Food found successfully." } */

    /* #swagger.responses[400] = {
      schema: { "$ref": "#/definitions/ErrorFieldResponse" },
      description: "Missing fields or invalid fields." }
      */

    next();
  },
  routeAdapter(makeFindAllFoodController())
);

export default findAllFoodRoutes;
