import * as z from 'zod';

import PatientRepositories from '../../../../shared/database/repositories/patient';
import verifyObject from '../../../../shared/utils-test/verifyObject';

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
  };

  beforeEach(() => {
    const patientRepositoriesInstance = {
      findUnique: jest.fn(),
    } as unknown as PatientRepositories;

    spy = {
      'patientRepositories.findUnique': jest.spyOn(
        patientRepositoriesInstance,
        'findUnique'
      ),
    };

    service = new FindByPatientId(patientRepositoriesInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      status: 'ACTIVE',
    });

    // Act
    const patient = await service.execute({
      patientId: 'any_patient_id',
      userId: 'any_user_id',
    });

    // Assert
    expect(verifyObject(patientSchema, patient!)).toBe(true);
  });
});
