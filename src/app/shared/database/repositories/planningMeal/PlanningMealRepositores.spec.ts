import { createMockPrisma } from '../../../utils-test/createMockPrisma';
import PlanningMealRepositores from './PlanningMealRepositories';

describe('Planning Meal Repositories', () => {
  let repository: PlanningMealRepositores;
  const spy = {
    findFirst: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(() => {
    const mock = {
      planningMeal: spy,
    };

    const prismaMock = createMockPrisma(mock);
    repository = new PlanningMealRepositores(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call correcly create', async () => {
    // Arrange
    const createMock = {
      data: {
        userId: 'user_id',
        patientId: 'patient_id',
      },
    };

    // Act
    await repository.create(createMock);

    // Assert
    expect(spy.create).toBeCalledWith(createMock);
  });

  it('should call correcly find first', async () => {
    // Arrange
    const findFirstMock = {
      where: {
        userId: 'user_id',
        patientId: 'patient_id',
      },
    };

    // Act
    await repository.findFirst(findFirstMock);

    // Assert
    expect(spy.findFirst).toBeCalledWith(findFirstMock);
  });

  it('should call correcly delete', async () => {
    // Arrange
    const deleteMock = {
      where: {
        id: 'id',
      },
    };

    // Act
    await repository.delete({
      where: {
        id: 'id',
      },
    });

    // Assert
    expect(spy.delete).toBeCalledWith(deleteMock);
  });
});
