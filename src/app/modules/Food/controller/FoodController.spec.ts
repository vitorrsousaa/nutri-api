import { Request, Response } from 'express';

import { ZodError } from '../../../shared/error';
import FindAllFoodService from '../services/FindAll';
import FindAllByGroupFoodService from '../services/FindAllByGroup';
import { FoodController } from './FoodController';

describe('Food controller', () => {
  let mockResponse: Response;
  let mockRequest: Request;

  let controller: FoodController;

  let spy = {
    'findAllService.execute': {} as jest.SpiedFunction<
      FindAllFoodService['execute']
    >,
    'findAllByGroupService.execute': {} as jest.SpiedFunction<
      FindAllByGroupFoodService['execute']
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

    const findAllByGroupServiceInstance = {
      execute: jest.fn(),
    } as unknown as FindAllByGroupFoodService;

    spy = {
      'findAllService.execute': jest.spyOn(findAllServiceInstance, 'execute'),
      'findAllByGroupService.execute': jest.spyOn(
        findAllByGroupServiceInstance,
        'execute'
      ),
    };

    controller = new FoodController(
      findAllServiceInstance,
      findAllByGroupServiceInstance
    );
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
  });

  describe('findAll by group controller', () => {
    beforeEach(() => {
      spy['findAllByGroupService.execute'].mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should returned error when group is not correctly', async () => {
      // Arrange
      mockRequest.params = {
        group: 'group',
      };

      // Act
      try {
        await controller.findAllByGroup(mockRequest, mockResponse);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.message.some((error) => error.message === 'enum'));
        }
      }
    });

    it('should call response with returned of service', async () => {
      // Arrange
      spy['findAllByGroupService.execute'].mockResolvedValue([
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

      mockRequest.params = {
        group: 'CARB',
      };

      // Act
      await controller.findAllByGroup(mockRequest, mockResponse);

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
  });
});
