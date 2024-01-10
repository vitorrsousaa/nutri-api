import AnamnesisTemplateRepositories from '../../../../shared/database/repositories/anamnesisTemplate';

import {
  FindAllAnamnesisTemplateByUser,
  IFindAllAnamnesisTemplateByUserService,
} from './FindAllByUser';

describe('Find all anamnesis template by user service', () => {
  let service: IFindAllAnamnesisTemplateByUserService;

  let repository = {
    findMany: {} as jest.SpiedFunction<
      AnamnesisTemplateRepositories['findMany']
    >,
  };

  beforeEach(() => {
    const anamnesisTemplateRepositoriesInstance = {
      findMany: jest.fn(),
    } as unknown as AnamnesisTemplateRepositories;

    repository = {
      findMany: jest.spyOn(anamnesisTemplateRepositoriesInstance, 'findMany'),
    };

    service = new FindAllAnamnesisTemplateByUser(
      anamnesisTemplateRepositoriesInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return all anamnesis template by user', async () => {
    // Arrange
    const date = new Date();
    repository.findMany.mockResolvedValue([
      {
        id: 'any_id',
        userId: 'any_user_id',
        createdAt: date,
        updatedAt: date,
        text: 'any_text',
        title: 'any_title',
      },
    ]);

    // Act
    const result = await service.execute({ userId: 'any_user_id' });

    // Assert
    expect(result).toEqual([
      {
        id: 'any_id',
        userId: 'any_user_id',
        createdAt: date,
        updatedAt: date,
        text: 'any_text',
        title: 'any_title',
      },
    ]);
  });
});
