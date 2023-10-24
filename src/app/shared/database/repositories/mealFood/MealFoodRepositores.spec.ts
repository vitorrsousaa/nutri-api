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
        quantity: 200,
        mealId: 'meal_id',
        foodId: 'food_id',
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
