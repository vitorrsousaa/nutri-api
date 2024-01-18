import PatientRepositories from '../../../../shared/database/repositories/patient';
import { AppError } from '../../../../shared/error';

import { IUpdateService, UpdateService } from './UpdateService';

describe('Update patient service', () => {
  let service: IUpdateService;
  let spy = {
    'patientRepositories.update': {} as jest.SpiedFunction<
      PatientRepositories['update']
    >,
    'patientRepositories.findFirst': {} as jest.SpiedFunction<
      PatientRepositories['findFirst']
    >,
  };

  beforeEach(() => {
    const patientRepositoriesInstance = {
      update: jest.fn(),
      findFirst: jest.fn(),
    } as unknown as PatientRepositories;

    spy = {
      'patientRepositories.update': jest.spyOn(
        patientRepositoriesInstance,
        'update'
      ),

      'patientRepositories.findFirst': jest.spyOn(
        patientRepositoriesInstance,
        'findFirst'
      ),
    };

    service = new UpdateService(patientRepositoriesInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return patient when user is owner', async () => {
    // Arrange
    const date = new Date();
    spy['patientRepositories.update'].mockResolvedValue({
      birthDate: date,
      email: 'any_email',
      gender: 'MASC',
      height: 1.7,
      id: 'any_id',
      name: 'any_name',
      userId: 'any_user_id',
      weight: 70,
      status: 'ACTIVE',
    });

    const mockUpdatePatient = {
      name: 'any_name',
      email: 'any_email@email.com',
      height: 200,
    };

    // Act
    const output = await service.execute({
      patient: mockUpdatePatient,
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    });

    // Assert
    expect(output.patient).toStrictEqual({
      birthDate: date,
      email: 'any_email',
      gender: 'MASC',
      height: 1.7,
      id: 'any_id',
      name: 'any_name',
      userId: 'any_user_id',
      weight: 70,
      status: 'ACTIVE',
    });
  });

  it('Should throw error when email has already with other patient', async () => {
    // Arrange
    spy['patientRepositories.findFirst'].mockResolvedValue({
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

    const mockUpdatePatient = {
      name: 'any_name',
      email: 'any_email@email.com',
      height: 200,
    };

    // Act
    const promise = service.execute({
      patient: mockUpdatePatient,
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    });

    // Assert
    promise.catch((error) => {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Patient already exists');
    });
  });
});
