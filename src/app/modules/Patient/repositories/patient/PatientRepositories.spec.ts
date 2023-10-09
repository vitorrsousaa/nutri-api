import { createMockPrisma } from '../../../../shared/utils-test/createMockPrisma';
import PatientRepositories from './PatientRepositories';

describe('Patient Repositories', () => {
  it('Should correctly create patient', async () => {
    // Arrange
    const mock = {
      patient: {
        create: jest.fn(),
      },
    };
    const prismaMock = createMockPrisma(mock);
    const repository = new PatientRepositories(prismaMock);
    const date = new Date();

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
    expect(mock.patient.create).toBeCalledWith({
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
  });

  it('Should call correctly findUnique by email', async () => {
    // Arrange
    const mock = {
      patient: {
        findFirst: jest.fn(),
      },
    };
    const prismaMock = createMockPrisma(mock);
    const repository = new PatientRepositories(prismaMock);

    // Act
    await repository.findByEmail('any_email');

    // Assert
    expect(mock.patient.findFirst).toBeCalledWith({
      where: { email: 'any_email' },
    });
  });

  it('Should call correctly findUnique by id', async () => {
    // Arrange
    const mock = {
      patient: {
        findUnique: jest.fn(),
      },
    };
    const prismaMock = createMockPrisma(mock);
    const repository = new PatientRepositories(prismaMock);

    // Act
    await repository.findUnique({
      where: {
        id: 'any_id',
      },
    });

    // Assert
    expect(mock.patient.findUnique).toBeCalledWith({
      where: { id: 'any_id' },
    });
  });
});
