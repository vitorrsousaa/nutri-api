/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMockPrisma } from '../../../../shared/utils-test/createMockPrisma';
import verifyObject from '../../../../shared/utils-test/verifyObject';
import { createPatientDTO } from '../../dtos';
import PatientRepositories from '../../repositories/patient/PatientRepositories';
import { CreatePatientService } from './CreatePatientService';

describe('Create Patient Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should throw error when email has already in use', async () => {
    // Arrange
    const mockPrisma = {
      patient: {
        findFirst: jest.fn().mockResolvedValue({
          email: 'any_email',
        }),
      },
    };
    const patientMockPrisma = createMockPrisma(mockPrisma);
    const patientRepositoriesInstance = new PatientRepositories(
      patientMockPrisma
    );
    const service = new CreatePatientService(patientRepositoriesInstance);
    const mockPatient = {
      birthDate: new Date(),
      email: 'any_email',
      gender: 'MASC',
      height: 80,
      weight: 80,
      name: 'any_name',
    } as createPatientDTO;

    // Act
    try {
      await service.execute(mockPatient, 'user_id');
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('Email already in use');
    }
  });

  it('Should return patient when email is not in use', async () => {
    // Arrange
    const date = new Date();
    const mockPrisma = {
      patient: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest
          .fn()
          .mockResolvedValue({
            birthDate: date,
            email: 'any_email',
            gender: 'MASC',
            height: 80,
            weight: 80,
            name: 'any_name',
          }),
      },
    };
    const patientMockPrisma = createMockPrisma(mockPrisma);
    const patientRepositoriesInstance = new PatientRepositories(
      patientMockPrisma
    );
    const service = new CreatePatientService(patientRepositoriesInstance);
    const mockPatient = {
      birthDate: date,
      email: 'any_email',
      gender: 'MASC',
      height: 80,
      weight: 80,
      name: 'any_name',
    } as createPatientDTO;

    // Act
    const patient = await service.execute(mockPatient, 'user_id');
    const result = verifyObject(patient, [
      'email',
      'birthDate',
      'gender',
      'height',
      'name',
      'weight',
    ]);

    // Assert
    expect(result).toBeTruthy();
  });
});
