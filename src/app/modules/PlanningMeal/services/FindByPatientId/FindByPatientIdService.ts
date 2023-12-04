import PlanningMealRepositories from '../../../../shared/database/repositories/planningMeal/PlanningMealRepositories';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';

interface IFindByPatientIdServiceInput {
  patientId: string;
  userId: string;
}

export interface IFindByPatientIdService {
  execute(findByPatientIdServiceInput: IFindByPatientIdServiceInput): Promise<unknown>;
}

export class FindByPatientIdService implements IFindByPatientIdService {
  constructor(
    private readonly planningMealRepositories: PlanningMealRepositories,
    private readonly validatePatientOwnershipService: ValidatePatientOwnershipService
  ) {}

  async execute(findByPatientIdServiceInput: IFindByPatientIdServiceInput) {
    const { patientId, userId } = findByPatientIdServiceInput;

    await this.validatePatientOwnershipService.validate(userId, patientId);

    const planningMeal = await this.planningMealRepositories.findFirst({
      where: {
        patientId,
      },
      include: {
        meals: {
          include: {
            mealFoods: true,
          },
        },
      },
    });

    return planningMeal;
  }
}
