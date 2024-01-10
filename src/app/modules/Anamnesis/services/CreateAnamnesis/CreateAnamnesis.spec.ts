import AnamnesisRepositories from '../../../../shared/database/repositories/anamnesis';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';

import {
  CreateAnamnesisService,
  ICreateAnamnesisService,
} from './CreateAnamnesis';

describe('Create anamnesis service', () => {
  let service: ICreateAnamnesisService;

  let spy = {
    'anamnesisRepositories.create': {} as jest.SpiedFunction<
      AnamnesisRepositories['create']
    >,
    'validateOwnershipService.validate': {} as jest.SpiedFunction<
      ValidatePatientOwnershipService['validate']
    >,
  };

  beforeEach(() => {
    const anamnesisRepositoriesInstance = {
      create: jest.fn(),
    } as unknown as AnamnesisRepositories;

    const validatePatientOwnershipServiceInstance = {
      validate: jest.fn(),
    } as unknown as ValidatePatientOwnershipService;

    spy = {
      'anamnesisRepositories.create': jest.spyOn(
        anamnesisRepositoriesInstance,
        'create'
      ),
      'validateOwnershipService.validate': jest.spyOn(
        validatePatientOwnershipServiceInstance,
        'validate'
      ),
    };

    service = new CreateAnamnesisService(
      validatePatientOwnershipServiceInstance,
      anamnesisRepositoriesInstance
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
    const promise = service.execute({
      userId: 'any_user_id',
      patientId: 'any_patient_id',
      anamnesis: { title: 'any_title', text: 'any_text' },
    });

    // Assert
    await expect(promise).rejects.toThrow(new Error('Patient not found'));
  });

  it('Should return anamnesis when user is owner', async () => {
    // Arrange
    const date = new Date();
    spy['anamnesisRepositories.create'].mockResolvedValue({
      id: 'any_id',
      createdAt: date,
      updatedAt: date,
      title: 'any_title',
      text: 'any_text',
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    });

    // Act
    const result = await service.execute({
      userId: 'any_user_id',
      patientId: 'any_patient_id',
      anamnesis: { title: 'any_title', text: 'any_text' },
    });

    // Assert
    expect(result).toEqual({
      id: 'any_id',
      createdAt: date,
      updatedAt: date,
      title: 'any_title',
      text: 'any_text',
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    });
  });
});
