import { createMockPrisma } from '../../../../shared/utils-test/createMockPrisma';
import PatientRepositories from './PatientRepositories';

describe('Patient Repositories', () => {
  let repository: PatientRepositories;
  const spy = {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(() => {
    const mock = {
      patient: spy,
    };

    const prismaMock = createMockPrisma(mock);
    repository = new PatientRepositories(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should correctly create patient', async () => {
    // Arrange
    const date = new Date();

    const mockCreatePatient = {
      data: {
        birthDate: date,
        email: 'any_email',
        gender: 'MASC',
        height: 150,
        name: 'any_name',
        weight: 70,
        userId: 'user_id',
      },
    };

    // Act
    await repository.create({
      data: {
        birthDate: date,
        email: 'any_email',
        gender: 'MASC',
        height: 150,
        name: 'any_name',
        weight: 70,
        userId: 'user_id',
      },
    });

    // Assert
    expect(spy.create).toBeCalledWith(mockCreatePatient);
  });

  it('Should call correctly find by email', async () => {
    // Arrange

    // Act
    await repository.findByEmail('any_email');

    // Assert
    expect(spy.findFirst).toBeCalledWith({
      where: { email: 'any_email' },
    });
  });

  it('Should call correctly findUnique by id', async () => {
    // Arrange
    const mockFindUnique = {
      where: {
        id: 'any_id',
      },
    };

    // Act
    await repository.findUnique(mockFindUnique);

    // Assert
    expect(spy.findUnique).toBeCalledWith(mockFindUnique);
  });

  it('Should call findAll correctly', async () => {
    // Arrange
    const mockFindAll = {
      where: {
        userId: 'any_id',
      },
    };

    // Act
    await repository.findAll(mockFindAll);

    // Assert
    expect(spy.findMany).toBeCalledWith(mockFindAll);
  });

  it('Should call findFirst correctly', async () => {
    // Arrange
    const mockFindFirst = {
      where: {
        userId: 'any_id',
      },
    };

    // Act
    await repository.findFirst(mockFindFirst);

    // Assert
    expect(spy.findFirst).toBeCalledWith(mockFindFirst);
  });

  it('Should call delete correctly', async () => {
    // Arrange
    const mockDelete = {
      where: {
        id: 'any_id',
      },
    };

    // Act
    await repository.delete({
      where: {
        id: 'any_id',
      },
    });

    // Assert
    expect(spy.delete).toBeCalledWith(mockDelete);
  });

  it('Should call update correctly', async () => {
    // Arrange
    const mockUpdate = {
      where: {
        id: 'any_id',
      },
      data: {
        email: 'any_email',
        height: 150,
      },
    };

    // Act
    await repository.update(mockUpdate);

    // Assert
    expect(spy.update).toBeCalledWith(mockUpdate);
  });
});
