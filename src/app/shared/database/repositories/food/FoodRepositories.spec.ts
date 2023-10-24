import { createMockPrisma } from '../../../utils-test/createMockPrisma';
import FoodRepositories from './FoodRepositories';

describe('Food Repositories', () => {
  it('Should call findMany with args', async () => {
    // Arrange
    const mock = {
      food: {
        findMany: jest.fn(),
      },
    };

    const prismaMock = createMockPrisma(mock);
    const repository = new FoodRepositories(prismaMock);

    // Act
    await repository.findAll({
      where: {
        group: 'CARB',
      },
    });

    // Assert
    expect(mock.food.findMany).toBeCalledWith({ where: { group: 'CARB' } });
  });
});
