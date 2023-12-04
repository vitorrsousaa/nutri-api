import PlanningMealRepositories from '../../../../shared/database/repositories/planningMeal';
import { ZodError } from '../../../../shared/error';
import { IValidatePatientHasPlanning } from '../../../../shared/services/ValidatePatientHasPlanning';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';
import verifyObject from '../../../../shared/utils-test/verifyObject';
import { ICreatePlanningMealDTO } from '../../dtos/create-planning-meal-dto';
import {
  CreatePlanningMealOutputSchema,
  CreatePlanningMealService,
} from './CreatePlanningMealService';

describe('Create Planning Meal Service', () => {
  let service: CreatePlanningMealService;

  let spy = {
    'planningMealRepositories.create': {} as jest.SpiedFunction<
      PlanningMealRepositories['create']
    >,
    'validateOwnershipService.validate': {} as jest.SpiedFunction<
      ValidatePatientOwnershipService['validate']
    >,
    'validatePatientHasPlanning.validate': {} as jest.SpiedFunction<
      IValidatePatientHasPlanning['validate']
    >,
  };

  beforeEach(() => {
    const planningMealRepositoriesInstance = {
      create: jest.fn(),
    } as unknown as PlanningMealRepositories;

    const validatePatientOwnershipServiceInstance = {
      validate: jest.fn(),
    } as unknown as ValidatePatientOwnershipService;

    const validatePatientHasPlanningInstance = {
      validate: jest.fn(),
    } as unknown as IValidatePatientHasPlanning;

    spy = {
      'planningMealRepositories.create': jest.spyOn(
        planningMealRepositoriesInstance,
        'create'
      ),
      'validateOwnershipService.validate': jest.spyOn(
        validatePatientOwnershipServiceInstance,
        'validate'
      ),
      'validatePatientHasPlanning.validate': jest.spyOn(
        validatePatientHasPlanningInstance,
        'validate'
      ),
    };

    service = new CreatePlanningMealService(
      planningMealRepositoriesInstance,
      validatePatientOwnershipServiceInstance,
      validatePatientHasPlanningInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should throw error when user not owner patient', async () => {
    // Arrange
    spy['validateOwnershipService.validate'].mockRejectedValue(
      new Error('Patient not found')
    );

    // Act
    const promise = service.execute(
      {} as ICreatePlanningMealDTO,
      'any_user_id',
      'any_patient_id'
    );

    // Assert
    await expect(promise).rejects.toThrow(new Error('Patient not found'));
  });

  it('Should throw error when patient has planning', async () => {
    // Arrange
    spy['validatePatientHasPlanning.validate'].mockRejectedValue(
      new Error('Patient has planning')
    );

    // Act
    const promise = service.execute(
      {} as ICreatePlanningMealDTO,
      'any_user_id',
      'any_patient_id'
    );

    // Assert
    await expect(promise).rejects.toThrow(new Error('Patient has planning'));
  });

  it('Should throw error when origin food is invalid', async () => {
    // Arrange
    const createPlanningMealDTO = {
      meals: [
        {
          name: 'any_meal_name',
          time: 'any_time',
          foods: [
            {
              calories: 100,
              name: 'any_food_name',
              origin: 'any_origin',
              carb: 100,
              fat: 100,
              id: 'any_id',
              protein: 100,
              quantity: 100,
            },
          ],
        },
      ],
    } as unknown as ICreatePlanningMealDTO;

    // Act
    try {
      await service.execute(
        createPlanningMealDTO,
        'any_user_id',
        'any_patient_id'
      );
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.message.some((item) => /\bDATABASE\b/.test(item.message)));
      }
    }
  });

  it('Should return planning meal when success', async () => {
    // Arrange
    spy['planningMealRepositories.create'].mockResolvedValue({
      id: 'f9798144-decc-4844-bb0f-9219e63aa026',
      userId: '2d5f7610-2361-4b0d-9d03-36da39e226e2',
      patientId: 'd0317f46-efae-4049-8e40-b70489295f78',
      description: 'Planning description',
    });

    const mockCreatePlanningMeal = {
      meals: [
        {
          name: 'Teste',
          time: 'time',
          foods: [
            {
              id: '41295d94-09b0-4ce3-b83d-2ad829f3b8f4',
              name: 'Abacaxi',
              origin: 'TACO',
              quantity: 100,
              calories: 1200,
              protein: 200,
              fat: 100,
              carb: 10,
              baseUnit: 'g',
            },
          ],
        },
      ],
    } as ICreatePlanningMealDTO;

    // Act
    const result = await service.execute(
      mockCreatePlanningMeal,
      '2d5f7610-2361-4b0d-9d03-36da39e226e2',
      'd0317f46-efae-4049-8e40-b70489295f78'
    );

    // Assert
    expect(verifyObject(CreatePlanningMealOutputSchema, result)).toBeTruthy();
  });
});
