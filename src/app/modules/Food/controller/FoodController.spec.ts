import { Request, Response } from 'express';

import { ZodError } from '../../../shared/error';
import FindAllFoodService from '../services/FindAll';
import { FoodController } from './FoodController';

describe('Food controller', () => {
  let mockResponse: Response;
  let mockRequest: Request;

  let controller: FoodController;

  let spy = {
    'findAllService.execute': {} as jest.SpiedFunction<
      FindAllFoodService['execute']
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

    const findAllServiceInstance = {
      execute: jest.fn(),
    } as unknown as FindAllFoodService;

    spy = {
      'findAllService.execute': jest.spyOn(findAllServiceInstance, 'execute'),
    };

    controller = new FoodController(findAllServiceInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  describe('findAll controller', () => {
    beforeEach(() => {
      spy['findAllService.execute'].mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call response with returned of service', async () => {
      // Arrange
      spy['findAllService.execute'].mockResolvedValue([
        {
          calories: 100,
          carb: 100,
          fat: 100,
          group: 'CARB',
          id: '123',
          name: 'name',
          protein: 100,
          quantity: 100,
        },
      ]);
      mockRequest.body = {
        origin: 'DATABASE',
      };

      // Act
      await controller.findAll(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.json).toBeCalledWith([
        {
          calories: 100,
          carb: 100,
          fat: 100,
          group: 'CARB',
          id: '123',
          name: 'name',
          protein: 100,
          quantity: 100,
        },
      ]);
    });

    it('should throw error when origin is not enum', async () => {
      // Arrange
      spy['findAllService.execute'].mockResolvedValue([
        {
          calories: 100,
          carb: 100,
          fat: 100,
          group: 'CARB',
          id: '123',
          name: 'name',
          protein: 100,
          quantity: 100,
        },
      ]);
      mockRequest.body = {
        origin: 'ANY_ORIGIN',
      };

      try {
        await controller.findAll(mockRequest, mockResponse);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.message.some((error) => error.message.includes('enum')));
        }
      }
    });
  });
});
