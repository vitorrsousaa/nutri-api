import PatientRepositories from '../../repositories/patient/PatientRepositories';
import ValidatePatientOwnershipService from '../ValidatePatientOwnership';
import { DeleteService } from './DeleteService';

describe('Delete patient service', () => {
  let service: DeleteService;
  let spy = {
    'patientRepositories.delete': {} as jest.SpiedFunction<
      PatientRepositories['delete']
    >,
    'validateOwnershipService.validate': {} as jest.SpiedFunction<
      ValidatePatientOwnershipService['validate']
    >,
  };

  beforeEach(() => {
    const patientRepositoriesInstance = {
      delete: jest.fn(),
    } as unknown as PatientRepositories;

    const validatePatientOwnershipServiceInstance = {
      validate: jest.fn(),
    } as unknown as ValidatePatientOwnershipService;

    spy = {
      'patientRepositories.delete': jest.spyOn(
        patientRepositoriesInstance,
        'delete'
      ),
      'validateOwnershipService.validate': jest.spyOn(
        validatePatientOwnershipServiceInstance,
        'validate'
      ),
    };

    service = new DeleteService(
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
    spy['patientRepositories.delete'].mockResolvedValue({
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
    expect(patient).toBeNull();
  });
});
