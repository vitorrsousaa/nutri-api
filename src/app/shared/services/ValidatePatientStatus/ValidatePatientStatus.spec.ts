import PatientRepositories from '../../database/repositories/patient';
import { ValidatePatientStatusService } from './ValidatePatientStatusService';

describe('Validate patient status service', () => {
  let service: ValidatePatientStatusService;

  let spy = {
    'patientRepositories.findFirst': {} as jest.SpiedFunction<
      PatientRepositories['findFirst']
    >,
  };

  beforeEach(() => {
    const patientRepositoriesInstance = {
      findFirst: jest.fn(),
    } as unknown as PatientRepositories;

    spy = {
      'patientRepositories.findFirst': jest.spyOn(
        patientRepositoriesInstance,
        'findFirst'
      ),
    };

    service = new ValidatePatientStatusService(patientRepositoriesInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error when patient not found', async () => {
    // Arrange
    spy['patientRepositories.findFirst'].mockResolvedValue(null);

    // Act
    try {
      await service.validate('any_id', 'any_patient_id');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('Patient not found');
    }
  });
});
