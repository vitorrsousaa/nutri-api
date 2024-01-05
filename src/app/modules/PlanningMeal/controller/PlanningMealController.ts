import { Request, Response } from 'express';

import { DataBaseIdSchema } from '../../../shared/entities/TUuid';
import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import { CreatePlanningMealSchema } from '../dtos/create-planning-meal-dto';
import CreatePlanningMealService from '../services/CreatePlanningMeal';
import {
  DeletePlanningMealSchema,
  IDeletePlanningMealService,
} from '../services/DeletePlanningMeal';
import { IFindByPatientIdService } from '../services/FindByPatientId';

class PlanningMealController {
  constructor(
    private readonly createPlanningMealService: CreatePlanningMealService,
    private readonly findByPatientIdService: IFindByPatientIdService,
    private readonly deletePlanningMealService: IDeletePlanningMealService
  ) {}

  create = async (request: Request, response: Response) => {
    const { params, metadata } = request;

    const patient = returnErrorMissingField(DataBaseIdSchema, params);

    const result = returnErrorMissingField(
      CreatePlanningMealSchema,
      request.body
    );

    const create = await this.createPlanningMealService.execute(
      result,
      metadata.accountId,
      patient.id
    );

    return response.json(create);
  };

  findByPatientId = async (request: Request, response: Response) => {
    const { params, metadata } = request;

    const patient = returnErrorMissingField(DataBaseIdSchema, params);

    const planningMeal = await this.findByPatientIdService.execute({
      patientId: patient.id,
      userId: metadata.accountId,
    });

    return response.json(planningMeal);
  };

  delete = async (request: Request, response: Response) => {
    const { params, metadata } = request;

    const patient = returnErrorMissingField(DataBaseIdSchema, params);

    const planningMealInput = returnErrorMissingField(
      DeletePlanningMealSchema,
      request.body
    );

    await this.deletePlanningMealService.execute({
      patientId: patient.id,
      userId: metadata.accountId,
      planningMealId: planningMealInput.planningMealId,
    });

    return response.sendStatus(204);
  };
}

export default PlanningMealController;
