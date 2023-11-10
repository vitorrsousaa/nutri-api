import MealFoodRepositories from '../../../../shared/database/repositories/mealFood';
import { ICreateMealFoodDTO } from '../../dtos/create-meal-food-dto';
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
    const mealFoodMock = {
      foodId: 'any_food_id',
      mealId: 'any_meal_id',
      id: 'any_id',
      quantity: 100,
      calories: 100,
      carb: 100,
      fat: 100,
      foodOrigin: 'DATABASE',
      name: 'any_name',
      protein: 100,
    };

    spy.create.mockResolvedValue(mealFoodMock);

    // Act
    const result = await service.execute({
      calories: 100,
      foodId: 'any_food_id',
      quantity: 100,
      carb: 100,
      fat: 100,
      foodOrigin: 'DATABASE',
      name: 'any_name',
      protein: 100,
    });

    // Assert
    expect(result).toEqual(mealFoodMock);
  });

  it('should call repository with correctly parameters', async () => {
    // Arrange
    const createMealFoodMock = {
      calories: 100,
      foodId: 'any_food_id',
      quantity: 100,
      carb: 100,
      fat: 100,
      foodOrigin: 'DATABASE',
      name: 'any_name',
      protein: 100,
    };

    // Act
    await service.execute(createMealFoodMock as ICreateMealFoodDTO);

    // Assert
    expect(spy.create).toHaveBeenCalledWith({
      data: createMealFoodMock,
    });
  });
});
