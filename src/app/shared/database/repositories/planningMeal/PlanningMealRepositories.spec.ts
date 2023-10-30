import { type PrismaClient } from '@prisma/client';

import PlanningMealRepositores from './PlanningMealRepositories';

describe('Planning Meal Repositories', () => {
  let repository: PlanningMealRepositores;
  let spy = {
    findFirst: {} as jest.SpiedFunction<
      PrismaClient['planningMeal']['findFirst']
    >,
    delete: {} as jest.SpiedFunction<PrismaClient['planningMeal']['delete']>,
    create: {} as jest.SpiedFunction<PrismaClient['planningMeal']['create']>,
  };

  beforeEach(() => {
    const prismaInstance = {
      planningMeal: {
        findFirst: jest.fn(),
        delete: jest.fn(),
        create: jest.fn(),
      },
    } as unknown as PrismaClient;

    spy = {
      findFirst: jest.spyOn(prismaInstance.planningMeal, 'findFirst'),
      delete: jest.spyOn(prismaInstance.planningMeal, 'delete'),
      create: jest.spyOn(prismaInstance.planningMeal, 'create'),
    };

    repository = new PlanningMealRepositores(prismaInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call correcly create', async () => {
    // Arrange
    spy.create.mockResolvedValue({
      id: 'id',
      patientId: 'patient_id',
      userId: 'user_id',
      description: 'description',
    });

    // Act
    const result = await repository.create({
      data: {
        userId: 'user_id',
        patientId: 'patient_id',
        description: 'any_description',
      },
    });

    // Assert
    expect(result).toEqual({
      id: 'id',
      patientId: 'patient_id',
      userId: 'user_id',
      description: 'description',
    });
  });

  it('should call correcly find first', async () => {
    // Arrange
    const findFirstMock = {
      where: {
        userId: 'user_id',
        patientId: 'patient_id',
      },
    };

    spy.findFirst.mockResolvedValue({
      id: 'id',
      patientId: 'patient_id',
      userId: 'user_id',
      description: 'description',
    });

    // Act
    const result = await repository.findFirst(findFirstMock);

    // Assert
    expect(result).toEqual({
      id: 'id',
      patientId: 'patient_id',
      userId: 'user_id',
      description: 'description',
    });
  });

  it('should call correcly delete', async () => {
    // Arrange
    spy.delete.mockResolvedValue({
      id: 'id',
      patientId: 'patient_id',
      userId: 'user_id',
      description: 'description',
    });

    // Act
    const result = await repository.delete({
      where: {
        id: 'id',
      },
    });

    // Assert
    expect(result).toEqual({
      id: 'id',
      patientId: 'patient_id',
      userId: 'user_id',
      description: 'description',
    });
  });
});
