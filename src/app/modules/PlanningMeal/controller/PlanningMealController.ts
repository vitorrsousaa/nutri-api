import { Request, Response } from 'express';

import { DataBaseIdSchema } from '../../../shared/entities/TUuid';
import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import { CreatePlanningMealSchema } from '../dtos/create-planning-meal-dto';
import CreatePlanningMealService from '../services/CreatePlanningMeal';

class PlanningMealController {
  constructor(
    private readonly createPlanningMealService: CreatePlanningMealService
  ) {}

  create = async (request: Request, response: Response) => {
    const { params, user } = request;

    const patient = returnErrorMissingField(DataBaseIdSchema, params);

    const result = returnErrorMissingField(
      CreatePlanningMealSchema,
      request.body
    );

    const create = await this.createPlanningMealService.execute(
      result,
      user.id,
      patient.id
    );

    return response.json(create);
  };
}

export default PlanningMealController;
