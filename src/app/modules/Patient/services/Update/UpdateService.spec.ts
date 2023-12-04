import PatientRepositories from '../../../../shared/database/repositories/patient';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';
import ValidatePatientStatusService from '../../../../shared/services/ValidatePatientStatus';
import { IUpdatePatientDTO } from '../../dtos/update-patient-dto';
import { IUpdateService, UpdateService } from './UpdateService';

describe('Update patient service', () => {
  let service: IUpdateService;
  let spy = {
    'patientRepositories.update': {} as jest.SpiedFunction<
      PatientRepositories['update']
    >,
    'validateOwnershipService.validate': {} as jest.SpiedFunction<
      ValidatePatientOwnershipService['validate']
    >,
    'validateStatusService.validate': {} as jest.SpiedFunction<
      ValidatePatientStatusService['validate']
    >,
  };

  beforeEach(() => {
    const patientRepositoriesInstance = {
      update: jest.fn(),
    } as unknown as PatientRepositories;

    const validatePatientOwnershipServiceInstance = {
      validate: jest.fn(),
    } as unknown as ValidatePatientOwnershipService;

    const validatePatientStatusServiceInstance = {
      validate: jest.fn(),
    } as unknown as ValidatePatientStatusService;

    spy = {
      'patientRepositories.update': jest.spyOn(
        patientRepositoriesInstance,
        'update'
      ),
      'validateOwnershipService.validate': jest.spyOn(
        validatePatientOwnershipServiceInstance,
        'validate'
      ),
      'validateStatusService.validate': jest.spyOn(
        validatePatientStatusServiceInstance,
        'validate'
      ),
    };

    service = new UpdateService(
      patientRepositoriesInstance,
      validatePatientOwnershipServiceInstance,
      validatePatientStatusServiceInstance
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

    const patientUpdateDTO = {};

    // Act
    const promise = service.execute({
      patient: patientUpdateDTO as IUpdatePatientDTO,
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    });

    // Assert
    await expect(promise).rejects.toThrow(new Error('Patient not found'));
  });

  it('Should throw error when patient is not active', async () => {
    // Arrange
    spy['validateStatusService.validate'].mockRejectedValue(
      new Error('Patient not found')
    );

    const patientUpdateDTO = {};

    // Act
    const promise = service.execute({
      patient: patientUpdateDTO as IUpdatePatientDTO,
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    });

    // Assert
    await expect(promise).rejects.toThrow(new Error('Patient not found'));
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
});
