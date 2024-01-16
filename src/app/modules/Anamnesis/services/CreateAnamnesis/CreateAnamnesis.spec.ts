import AnamnesisRepositories from '../../../../shared/database/repositories/anamnesis';

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
  };

  beforeEach(() => {
    const anamnesisRepositoriesInstance = {
      create: jest.fn(),
    } as unknown as AnamnesisRepositories;

    spy = {
      'anamnesisRepositories.create': jest.spyOn(
        anamnesisRepositoriesInstance,
        'create'
      ),
    };

    service = new CreateAnamnesisService(anamnesisRepositoriesInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
