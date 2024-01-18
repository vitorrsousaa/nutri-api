import PatientRepositories from '../../../../shared/database/repositories/patient';

import { DeleteService } from './DeleteService';

describe('Delete patient service', () => {
  let service: DeleteService;
  let spy = {
    'patientRepositories.delete': {} as jest.SpiedFunction<
      PatientRepositories['delete']
    >,
  };

  beforeEach(() => {
    const patientRepositoriesInstance = {
      delete: jest.fn(),
    } as unknown as PatientRepositories;

    spy = {
      'patientRepositories.delete': jest.spyOn(
        patientRepositoriesInstance,
        'delete'
      ),
    };

    service = new DeleteService(patientRepositoriesInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      status: 'ACTIVE',
    });

    // Act
    const patient = await service.execute('any_user_id', 'any_patient_id');

    // Assert
    expect(patient).toBeNull();
  });
});
