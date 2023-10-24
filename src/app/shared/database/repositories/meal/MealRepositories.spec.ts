import { createMockPrisma } from '../../../utils-test/createMockPrisma';
import MealRepositories from './MealRepositories';

describe('Meal Repositories', () => {
  let repository: MealRepositories;
  const spy = {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(() => {
    const mock = {
      meal: spy,
    };

    const prismaMock = createMockPrisma(mock);
    repository = new MealRepositories(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call delete correctly', async () => {
    // Arrange
    const deleteMock = {
      where: {
        id: '12',
      },
    };

    // Act
    await repository.delete(deleteMock);

    expect(spy.delete).toBeCalledWith(deleteMock);
  });

  it('Should call create correctly', async () => {
    // Arrange

    // Act
    await repository.create({
      data: {
        name: 'name',
        time: 'time',
      },
    });

    expect(spy.create).toBeCalledWith({
      data: {
        name: 'name',
        time: 'time',
      },
    });
  });

  it('Should call findUnique correctly', async () => {
    // Arrange

    // Act
    await repository.findUnique({ where: { id: '1' } });

    expect(spy.findUnique).toBeCalledWith({ where: { id: '1' } });
  });

  it('Should call findFirst correctly', async () => {
    // Arrange

    // Act
    await repository.findFirst({
      where: {
        name: 'name',
      },
    });

    expect(spy.findFirst).toBeCalledWith({
      where: {
        name: 'name',
      },
    });
  });
});
