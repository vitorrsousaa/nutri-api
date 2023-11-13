import { Request, Response } from 'express';

import { ZodError } from '../../../shared/error';
import CreatePlanningMealService from '../services/CreatePlanningMeal';
import PlanningMealController from './PlanningMealController';

describe('Planning Meal Controller', () => {
  let mockResponse: Response;
  let mockRequest: Request;

  let controller: PlanningMealController;

  let spy = {
    'createPlanningMealService.execute': {} as jest.SpiedFunction<
      CreatePlanningMealService['execute']
    >,
  };

  beforeEach(() => {
    mockResponse = {
      json: jest.fn(),
      sendStatus: jest.fn().mockReturnThis(),
    } as unknown as Response;

    mockRequest = {
      user: {},
      body: {},
    } as unknown as Request;

    const createPlanningMealServiceInstance = {
      execute: jest.fn(),
    } as unknown as CreatePlanningMealService;

    spy = {
      'createPlanningMealService.execute': jest.spyOn(
        createPlanningMealServiceInstance,
        'execute'
      ),
    };

    controller = new PlanningMealController(createPlanningMealServiceInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  describe('Create Planning Meal Controller', () => {
    beforeEach(() => {
      spy['createPlanningMealService.execute'].mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should throw error when patiend id is not valid id', async () => {
      // Arrange
      mockRequest.params = {
        id: 'invalid_id',
      };

      try {
        await controller.create(mockRequest, mockResponse);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.message.some((error) => error.field === 'id'));
        }
      }
    });

    it('Should throw error when missing fields in create planning meal', async () => {
      // Arrange
      mockRequest.params = {
        id: 'd0317f46-efae-4049-8e40-b70489295f78',
      };
      mockRequest.body = {
        description: 'Planning description',
        meals: [
          {
            // name: 'Teste',
            time: 'time',
            foods: [
              {
                id: '41295d94-09b0-4ce3-b83d-2ad829f3b8f4',
                name: 'Abacaxi',
                origin: 'DATABASE',
                quantity: 100,
                calories: 1200,
                protein: 200,
                fat: 100,
                carb: 10,
              },
            ],
          },
        ],
      };

      // Act
      try {
        await controller.create(mockRequest, mockResponse);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.message[0].message).toBe('Required');
        }
      }
    });

    it('Should return correctly response', async () => {
      // Arrange
      mockRequest.params = {
        id: 'd0317f46-efae-4049-8e40-b70489295f78',
      };

      mockRequest.body = {
        description: 'Planning description',
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
              },
            ],
          },
        ],
      };

      mockRequest.user = {
        id: '2d5f7610-2361-4b0d-9d03-36da39e226e2',
      };

      spy['createPlanningMealService.execute'].mockResolvedValue({
        description: 'Planning description',
        id: 'd0317f46-efae-4049-8e40-b70489295f78',
        patientId: '2d5f7610-2361-4b0d-9d03-36da39e226e2',
        userId: '2d5f7610-2361-4b0d-9d03-36da39e226e2',
      });

      // Act
      await controller.create(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.json).toBeCalledWith({
        description: 'Planning description',
        id: 'd0317f46-efae-4049-8e40-b70489295f78',
        patientId: '2d5f7610-2361-4b0d-9d03-36da39e226e2',
        userId: '2d5f7610-2361-4b0d-9d03-36da39e226e2',
      });
    });

    it('Should call correctly create planning meal service', async () => {
      // Arrange
      const createMockPlanning = {
        description: 'Planning description',
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
              },
            ],
          },
        ],
      };
      mockRequest.params = {
        id: 'd0317f46-efae-4049-8e40-b70489295f78',
      };

      mockRequest.body = createMockPlanning;

      mockRequest.user = {
        id: '2d5f7610-2361-4b0d-9d03-36da39e226e2',
      };

      // Act
      await controller.create(mockRequest, mockResponse);

      // Assert
      expect(spy['createPlanningMealService.execute']).toBeCalledWith(
        createMockPlanning,
        '2d5f7610-2361-4b0d-9d03-36da39e226e2',
        'd0317f46-efae-4049-8e40-b70489295f78'
      );
    });
  });
});
