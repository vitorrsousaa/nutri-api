import FoodRepositories from '../../../../shared/database/repositories/food';
import { FindAllByGroupFoodService } from './FindAllByGroup';

describe('Find all food by group', () => {
  let service: FindAllByGroupFoodService;
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

    service = new FindAllByGroupFoodService(foodRepositoriesInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call repository with parameter', async () => {
    // Arrange

    // Act
    await service.execute('CARB');

    // Assert
    expect(repository.findAll).toBeCalledWith({ where: { group: 'CARB' } });
  });

  it('Should call return all foods by group', async () => {
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
    const foods = await service.execute('CARB');

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
