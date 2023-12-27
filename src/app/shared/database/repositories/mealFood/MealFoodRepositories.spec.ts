import { createMockPrisma } from '../../../utils-test/createMockPrisma';
import MealFoodRepositories from './MealFoodRepositories';

describe('Meal Food Repositories', () => {
  let repository: MealFoodRepositories;
  const spy = {
    delete: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(() => {
    const mock = {
      mealFood: spy,
    };

    const prismaMock = createMockPrisma(mock);
    repository = new MealFoodRepositories(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call create meal food correctly', async () => {
    // Arrange
    const createMealFoodMock = {
      data: {
        calories: 100,
        foodId: 'any_food_id',
        quantity: 100,
        carb: 100,
        fat: 100,
        foodOrigin: 'DATABASE',
        name: 'any_name',
        protein: 100,
        baseUnit: 'any_base_unit',
      },
    };

    // Act
    await repository.create(createMealFoodMock);

    // Assert
    expect(spy.create).toBeCalledWith(createMealFoodMock);
  });

  it('should call delete meal food correctly', async () => {
    // Arrange
    const deleteMealFoodMock = {
      where: {
        id: 'id',
      },
    };

    // Act
    await repository.delete(deleteMealFoodMock);

    // Assert
    expect(spy.delete).toBeCalledWith(deleteMealFoodMock);
  });
});
