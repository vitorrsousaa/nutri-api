import PatientRepositories from '../../../../shared/database/repositories/patient';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';

export class FindByPatientId {
  constructor(
    private readonly patientRepositories: PatientRepositories,
    private readonly validatePatientOwnershipService: ValidatePatientOwnershipService
  ) {}

  async execute(userId: string, patientId: string) {
    await this.validatePatientOwnershipService.validate(userId, patientId);

    const patient = await this.patientRepositories.findUnique({
      where: {
        id: patientId,
        userId: userId,
      },
      include: {
        planningMeal: {
          include: {
            meals: {
              include: {
                mealFoods: true,
              },
            },
          },
        },
      },
    });

    return patient;
  }
}
