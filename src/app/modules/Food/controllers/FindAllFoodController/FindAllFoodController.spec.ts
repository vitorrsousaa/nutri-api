import { IRequest } from '../../../../interfaces/controller';
import { ZodError } from '../../../../shared/error';
import FindAllFoodService from '../../services/FindAll';
import { FindAllFoodController } from './FindAllFoodController';

describe('Find all food controller', () => {
  let mockRequest: IRequest;
  let controller: FindAllFoodController;
  let spy = {
    'findAllFoodService.execute': {} as jest.SpiedFunction<
      FindAllFoodService['execute']
    >,
  };

  beforeEach(() => {
    const findAllServiceInstance = {
      execute: jest.fn(),
    } as unknown as FindAllFoodService;

    mockRequest = {
      params: {},
    } as unknown as IRequest;

    spy = {
      'findAllFoodService.execute': jest.spyOn(
        findAllServiceInstance,
        'execute'
      ),
    };

    controller = new FindAllFoodController(findAllServiceInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.params = {};
  });

  it('should call response with returned of service', async () => {
    // Arrange
    spy['findAllFoodService.execute'].mockResolvedValue([
      {
        name: 'any_food',
        baseUnit: 'G',
        baseQty: 100,
        attributes: [],
        id: 'any_id',
        categoryName: 'any_category',
      },
    ]);

    mockRequest.params = {
      origin: 'TACO',
    };

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 200,
      body: [
        {
          name: 'any_food',
          baseUnit: 'G',
          baseQty: 100,
          attributes: [],
          id: 'any_id',
          categoryName: 'any_category',
        },
      ],
    });
  });

  it('should throw error when origin is not enum', async () => {
    // Arrange
    mockRequest.params = {
      origin: 'ANY_ORIGIN',
    };

    try {
      await controller.handle(mockRequest);
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.message.some((error) => error.message.includes('enum')));
      }
    }
  });
});
