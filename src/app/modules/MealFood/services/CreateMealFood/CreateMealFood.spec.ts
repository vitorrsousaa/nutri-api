import MealFoodRepositories from '../../../../shared/database/repositories/mealFood';
import { CreateMealFoodService } from './CreateMealFood';

describe('Create meal food service', () => {
  let service: CreateMealFoodService;
  let spy: {
    create: jest.SpiedFunction<MealFoodRepositories['create']>;
  };

  beforeEach(() => {
    const mealFoodRepositoriesInstance = {
      create: jest.fn(),
    } as unknown as MealFoodRepositories;

    spy = {
      create: jest.spyOn(mealFoodRepositoriesInstance, 'create'),
    };

    service = new CreateMealFoodService(mealFoodRepositoriesInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return created meal food', async () => {
    // Arrange
    spy.create.mockResolvedValue({
      foodId: 'any_food_id',
      mealId: 'any_meal_id',
      id: 'any_id',
      quantity: 100,
    });

    // Act
    const result = await service.execute(100, 'any_food_id');

    // Assert
    expect(result).toEqual({
      foodId: 'any_food_id',
      mealId: 'any_meal_id',
      id: 'any_id',
      quantity: 100,
    });
  });
  it('should return created meal food', async () => {
    // Arrange

    // Act
    await service.execute(100, 'any_food_id');

    // Assert
    expect(spy.create).toHaveBeenCalledWith({
      data: { foodId: 'any_food_id', quantity: 100 },
    });
  });
});
