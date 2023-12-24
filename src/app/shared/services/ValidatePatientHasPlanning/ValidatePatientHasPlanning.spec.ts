import PlanningMealRepositories from '../../database/repositories/planningMeal';
import {
  IValidatePatientHasPlanning,
  ValidatePatientHasPlanning,
} from './ValidatePatientHasPlanning';

describe('Validate patient has planning', () => {
  let service: IValidatePatientHasPlanning;

  let spy: {
    'planningMealRepositories.findFirst': jest.SpiedFunction<
      PlanningMealRepositories['findFirst']
    >;
  };

  beforeEach(() => {
    const planningMealRepositoriesInstance = {
      findFirst: jest.fn(),
    } as unknown as PlanningMealRepositories;

    spy = {
      'planningMealRepositories.findFirst': jest.spyOn(
        planningMealRepositoriesInstance,
        'findFirst'
      ),
    };

    service = new ValidatePatientHasPlanning(planningMealRepositoriesInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should throw error when patient has planning', async () => {
    // Arrange
    spy['planningMealRepositories.findFirst'].mockResolvedValue({
      description: 'any_description',
      id: 'any_id',
      patientId: 'any_patient_id',
      userId: 'any_user_id',
      createdAt: new Date(),
      endsIn: new Date(),
    });

    // Act
    try {
      await service.validate({ patientId: 'any_patient_id' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('Patient has planning');
    }
  });

  it('Should return void when patient has no planning', async () => {
    // Arrange
    spy['planningMealRepositories.findFirst'].mockResolvedValue(null);

    // Act
    const result = await service.validate({ patientId: 'any_patient_id' });

    // Assert
    expect(result).toBeUndefined();
  });
});
