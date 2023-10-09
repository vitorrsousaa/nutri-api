/* eslint-disable @typescript-eslint/no-explicit-any */

import UserRepositories from '../../../../shared/database/repositories/user';
import { createMockPrisma } from '../../../../shared/utils-test/createMockPrisma';
import verifyObject from '../../../../shared/utils-test/verifyObject';
import { ICrypt } from '../../providers/crypt';
import SignUp from './SignUpService';

describe('SignUp Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return user when email is not in use', async () => {
    // Arrange
    const mockPrisma = {
      user: {
        findUnique: jest.fn().mockReturnValue(null),
        create: jest.fn().mockReturnValue({
          email: 'any_email',
          name: 'any_name',
          id: 'any_id',
        }),
      },
    };
    const userMockPrisma = createMockPrisma(mockPrisma);
    const userRepositoriesInstance = new UserRepositories(userMockPrisma);
    const cryptProviderMock: ICrypt = {
      hash: jest.fn().mockResolvedValue('hashed_password'),
      compare: jest.fn(),
    };

    const service = new SignUp(userRepositoriesInstance, cryptProviderMock);

    // Act
    const user = await service.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
    });
    const result = verifyObject(user, ['email', 'name', 'id']);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should throw error when email is in use', async () => {
    // Arrange
    const mockPrisma = {
      user: {
        findUnique: jest.fn().mockReturnValue({ email: 'any_email' }),
      },
    };
    const userMockPrisma = createMockPrisma(mockPrisma);
    const userRepositoriesInstance = new UserRepositories(userMockPrisma);
    const cryptProviderMock: ICrypt = {
      hash: jest.fn().mockResolvedValue('hashed_password'),
      compare: jest.fn(),
    };
    const service = new SignUp(userRepositoriesInstance, cryptProviderMock);

    // Act
    try {
      await service.execute({
        email: 'any_email',
        name: 'any_name',
        password: 'any_password',
      });
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('Email already in use');
    }
  });
});
