/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from 'zod';

import verifyObject from '../../../../shared/utils-test/verifyObject';
import { createPatientDTO } from '../../dtos/create-patient-dto';
import PatientRepositories from '../../repositories/patient/PatientRepositories';
import { CreatePatientService } from './CreatePatientService';

const patientSchema = z.object({
  name: z.string(),
  email: z.string(),
  birthDate: z.date(),
  gender: z.string(),
  height: z.number(),
  weight: z.number(),
});

describe('Create Patient Service', () => {
  let service: CreatePatientService;

  let spy = {
    'patientRepositories.create': {} as jest.SpiedFunction<
      PatientRepositories['create']
    >,
    'patientRepositories.findByEmail': {} as jest.SpiedFunction<
      PatientRepositories['findByEmail']
    >,
  };

  beforeEach(() => {
    const patientRepositoriesInstance = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    } as unknown as PatientRepositories;

    spy = {
      'patientRepositories.create': jest.spyOn(
        patientRepositoriesInstance,
        'create'
      ),
      'patientRepositories.findByEmail': jest.spyOn(
        patientRepositoriesInstance,
        'findByEmail'
      ),
    };

    service = new CreatePatientService(patientRepositoriesInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should throw error when email has already in use', async () => {
    // Arrange
    const date = new Date();

    spy['patientRepositories.findByEmail'].mockResolvedValue({
      birthDate: date,
      email: 'any_email',
      gender: 'MASC',
      height: 80,
      id: 'any_id',
      name: 'any_name',
      userId: 'any_user_id',
      weight: 80,
    });

    const mockCreatePatient = {
      birthDate: new Date(),
      email: 'any_email',
      gender: 'MASC',
      height: 80,
      weight: 80,
      name: 'any_name',
    } as createPatientDTO;

    // Act
    try {
      await service.execute(mockCreatePatient, 'user_id');
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('Email already in use');
    }
  });

  it('Should return patient when email is not in use', async () => {
    // Arrange
    const date = new Date();
    spy['patientRepositories.findByEmail'].mockResolvedValue(null);
    spy['patientRepositories.create'].mockResolvedValue({
      birthDate: date,
      email: 'any_email',
      gender: 'MASC',
      height: 80,
      weight: 80,
      name: 'any_name',
      id: 'any_id',
      userId: 'any_user_id',
    });

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
    const result = verifyObject(patientSchema, patient);

    // Assert
    expect(result).toBeTruthy();
  });
});
