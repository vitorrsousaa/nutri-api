import * as z from 'zod';

import verifyObject from '../../../../shared/utils-test/verifyObject';
import PatientRepositories from '../../repositories/patient/PatientRepositories';
import ValidatePatientOwnershipService from '../ValidatePatientOwnership';
import { FindByPatientId } from './FindByPatientId';

const patientSchema = z.object({
  name: z.string(),
  email: z.string(),
  height: z.number(),
  birthDate: z.date(),
  gender: z.string(),
  id: z.string(),
  userId: z.string(),
  weight: z.number(),
});

describe('Find Patient by patient id', () => {
  let service: FindByPatientId;
  let spy = {
    'patientRepositories.findUnique': {} as jest.SpiedFunction<
      PatientRepositories['findUnique']
    >,
    'validateOwnershipService.validate': {} as jest.SpiedFunction<
      ValidatePatientOwnershipService['validate']
    >,
  };

  beforeEach(() => {
    const patientRepositoriesInstance = {
      findUnique: jest.fn(),
    } as unknown as PatientRepositories;

    const validatePatientOwnershipServiceInstance = {
      validate: jest.fn(),
    } as unknown as ValidatePatientOwnershipService;

    spy = {
      'patientRepositories.findUnique': jest.spyOn(
        patientRepositoriesInstance,
        'findUnique'
      ),
      'validateOwnershipService.validate': jest.spyOn(
        validatePatientOwnershipServiceInstance,
        'validate'
      ),
    };

    service = new FindByPatientId(
      patientRepositoriesInstance,
      validatePatientOwnershipServiceInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should throw error user not owner patient', async () => {
    // Arrange
    spy['validateOwnershipService.validate'].mockRejectedValue(
      new Error('Patient not found')
    );

    // Act
    const promise = service.execute('any_user_id', 'any_patient_id');

    // Assert
    await expect(promise).rejects.toThrow(new Error('Patient not found'));
  });

  it('Should return patient when user is owner', async () => {
    // Arrange
    spy['patientRepositories.findUnique'].mockResolvedValue({
      birthDate: new Date(),
      email: 'any_email',
      gender: 'MASC',
      height: 1.7,
      id: 'any_id',
      name: 'any_name',
      userId: 'any_user_id',
      weight: 70,
    });

    // Act
    const patient = await service.execute('any_user_id', 'any_patient_id');

    // Assert
    expect(verifyObject(patientSchema, patient!)).toBe(true);
  });
});
