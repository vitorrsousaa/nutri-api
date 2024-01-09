import FoodRepositories from '../../../../shared/database/repositories/food';

import { FindAllFoodService } from './FindAllFoodService';

describe('Find all food service', () => {
  let service: FindAllFoodService;
  let repository = {
    findAll: {} as jest.SpiedFunction<FoodRepositories['findAll']>,
  };

  beforeEach(() => {
    const foodRepositoriesInstance = {
      findAll: jest.fn(),
    } as unknown as FoodRepositories;

    repository = {
      findAll: jest.spyOn(foodRepositoriesInstance, 'findAll'),
    };

    service = new FindAllFoodService(foodRepositoriesInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return all foods', async () => {
    // Arrange
    repository.findAll.mockResolvedValue([
      {
        name: 'any_food',
        baseUnit: 'G',
        baseQty: 100,
        attributes: [],
        id: 'any_id',
        categoryName: 'any_category',
      },
    ]);

    // Act
    const foods = await service.execute();

    // Assert
    expect(foods).toEqual([
      {
        name: 'any_food',
        baseUnit: 'G',
        baseQty: 100,
        attributes: [],
        id: 'any_id',
        categoryName: 'any_category',
      },
    ]);
  });
});
