import { Request, Response } from 'express';

import { DataBaseIdSchema } from '../../../shared/entities/TUuid';
import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import { CreatePlanningMealSchema } from '../dtos/create-planning-meal-dto';
import CreatePlanningMealService from '../services/CreatePlanningMeal';
import {
  DeletePlanningMealSchema,
  IDeletePlanningMealService,
} from '../services/DeletePlanningMeal';

class PlanningMealController {
  constructor(
    private readonly createPlanningMealService: CreatePlanningMealService,
    private readonly deletePlanningMealService: IDeletePlanningMealService
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

  delete = async (request: Request, response: Response) => {
    const { params, user } = request;

    const patient = returnErrorMissingField(DataBaseIdSchema, params);

    const planningMealInput = returnErrorMissingField(
      DeletePlanningMealSchema,
      request.body
    );

    await this.deletePlanningMealService.execute({
      patientId: patient.id,
      userId: user.id,
      planningMealId: planningMealInput.planningMealId,
    });

    return response.sendStatus(204);
  };
}

export default PlanningMealController;
