import PlanningMealRepositories from '../../database/repositories/planningMeal';
import { AppError } from '../../error';

export interface IValidatePatientHasPlanning {
  validate(validateInput: IValidatePatientHasPlanningInput): Promise<void>;
}

export interface IValidatePatientHasPlanningInput {
  patientId: string;
}

export class ValidatePatientHasPlanning implements IValidatePatientHasPlanning {
  constructor(
    private readonly planningMealRepositories: PlanningMealRepositories
  ) {}

  async validate(
    validateInput: IValidatePatientHasPlanningInput
  ): Promise<void> {
    const { patientId } = validateInput;

    const patientHasPlanning = await this.planningMealRepositories.findFirst({
      where: {
        patientId,
      },
    });

    if (patientHasPlanning) {
      throw new AppError('Patient has planning', 404);
    }
  }
}
