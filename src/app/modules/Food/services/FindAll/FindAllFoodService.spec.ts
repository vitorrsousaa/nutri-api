import FoodRepositories from '../../../../shared/database/repositories/food';
import { FindAllFoodService } from './FindAllFoodService';

describe('Find all food', () => {
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
        calories: 100,
        protein: 10,
        carb: 10,
        fat: 10,
        id: 'any_id',
        group: 'CARB',
        quantity: 100,
      },
    ]);

    // Act
    const foods = await service.execute();

    // Assert
    expect(foods).toEqual([
      {
        name: 'any_food',
        calories: 100,
        protein: 10,
        carb: 10,
        fat: 10,
        id: 'any_id',
        group: 'CARB',
        quantity: 100,
      },
    ]);
  });
});
