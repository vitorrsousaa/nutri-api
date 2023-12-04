import PlanningMealRepositories from '../../../../shared/database/repositories/planningMeal';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';
import {
  DeletePlanningMealService,
  IDeletePlanningMealService,
} from './DeletePlanningMealService';

describe('Delete planning meal service', () => {
  let service: IDeletePlanningMealService;

  let spy = {
    'planningMealRepositories.delete': {} as jest.SpiedFunction<
      PlanningMealRepositories['delete']
    >,
    'validateOwnershipService.validate': {} as jest.SpiedFunction<
      ValidatePatientOwnershipService['validate']
    >,
  };

  beforeEach(() => {
    const planningMealRepositoriesInstance = {
      delete: jest.fn(),
    } as unknown as PlanningMealRepositories;

    const validatePatientOwnershipServiceInstance = {
      validate: jest.fn(),
    } as unknown as ValidatePatientOwnershipService;

    spy = {
      'planningMealRepositories.delete': jest.spyOn(
        planningMealRepositoriesInstance,
        'delete'
      ),
      'validateOwnershipService.validate': jest.spyOn(
        validatePatientOwnershipServiceInstance,
        'validate'
      ),
    };

    service = new DeletePlanningMealService(
      planningMealRepositoriesInstance,
      validatePatientOwnershipServiceInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should throw error user not owner patient', async () => {
    // Arrange
    spy['validateOwnershipService.validate'].mockRejectedValue(
      new Error('Patient not found')
    );

    // Act
    const promise = service.execute({
      patientId: 'patientId',
      planningMealId: 'planningMealId',
      userId: 'userId',
    });

    // Assert
    await expect(promise).rejects.toThrow(new Error('Patient not found'));
  });
});
