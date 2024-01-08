import * as z from 'zod';

import PlanningMealRepositories from '../../../../shared/database/repositories/planningMeal';
import AppError from '../../../../shared/error/AppError';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';

export const DeletePlanningMealSchema = z.object({
  planningMealId: z.string().uuid(),
});

export interface IDeletePlanningMealService {
  execute(deleteServiceInput: IDeletePlanningMealInput): Promise<null>;
}

export interface IDeletePlanningMealInput {
  userId: string;
  patientId: string;
  planningMealId: string;
}

export class DeletePlanningMealService implements IDeletePlanningMealService {
  constructor(
    private readonly planningMealRepositories: PlanningMealRepositories,
    private readonly validatePatientOwnershipService: ValidatePatientOwnershipService
  ) {}

  async execute(deleteServiceInput: IDeletePlanningMealInput): Promise<null> {
    const { userId, patientId, planningMealId } = deleteServiceInput;

    await this.validatePatient(userId, patientId);

    try {
      await this.planningMealRepositories.delete({
        where: {
          id: planningMealId,
        },
      });
      return null;
    } catch {
      throw new AppError('Planning not found', 404);
    }
  }

  private validatePatient(userId: string, patientId: string) {
    return Promise.all([
      this.validatePatientOwnershipService.validate(userId, patientId),
    ]);
  }
}
