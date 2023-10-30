import * as z from 'zod';

import UserRepositories from '../../../../shared/database/repositories/user';
import verifyObject from '../../../../shared/utils-test/verifyObject';
import { RecoverUserService } from './RecoverUserService';

const recoverUserServiceSchema = z.object({
  name: z.string(),
  email: z.string(),
});

describe('Recover user service', () => {
  let service: RecoverUserService;

  let spy = {
    'userRepositories.findUnique': {} as jest.SpiedFunction<
      UserRepositories['findUnique']
    >,
  };

  beforeEach(() => {
    const userRepositoriesInstance = {
      findUnique: jest.fn(),
    } as unknown as UserRepositories;

    spy = {
      'userRepositories.findUnique': jest.spyOn(
        userRepositoriesInstance,
        'findUnique'
      ),
    };

    service = new RecoverUserService(userRepositoriesInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user when id exists', async () => {
    // Arrange
    spy['userRepositories.findUnique'].mockResolvedValue({
      email: 'any_email',
      id: 'any_id',
      name: 'any_name',
      password: 'any_password',
    });

    // Act
    const recover = await service.execute('any_id');
    const result = verifyObject(recoverUserServiceSchema, recover);

    // Assert
    expect(result).toBeTruthy();
  });

  it('should throw error when user not exists', async () => {
    // Arrange
    spy['userRepositories.findUnique'].mockResolvedValue(null);

    // Act
    try {
      await service.execute('any_id');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('User not exists');
    }
  });
});
