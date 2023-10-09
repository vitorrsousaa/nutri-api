/* eslint-disable @typescript-eslint/no-explicit-any */

import UserRepositories from '../../../../shared/database/repositories/user/UserRepositories';
import { createMockPrisma } from '../../../../shared/utils-test/createMockPrisma';
import verifyObject from '../../../../shared/utils-test/verifyObject';
import { ICrypt } from '../../providers/crypt';
import SignIn from './SignInService';

describe('SignIn service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return user when email and password is correctly', async () => {
    // Arrange
    const mockPrisma = {
      user: {
        findUnique: jest.fn().mockReturnValue({
          name: 'any_name',
          email: 'any_email',
          id: 'any_id',
          password: 'any_password',
          createdAt: new Date(),
        }),
      },
    };
    const userMockPrisma = createMockPrisma(mockPrisma);
    const userRepositoriesInstance = new UserRepositories(userMockPrisma);
    const cryptProviderMock: ICrypt = {
      hash: jest.fn().mockResolvedValue('hashed_password'),
      compare: jest.fn().mockReturnValue(true),
    };

    const signInInstance = new SignIn(
      userRepositoriesInstance,
      cryptProviderMock
    );

    // Act
    const signIn = await signInInstance.execute('any_email', 'any_password');
    const result = verifyObject(signIn, ['name', 'email', 'id']);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should throw error when password is incorrectly', async () => {
    // Arrange
    const mockPrisma = {
      user: {
        findUnique: jest.fn().mockReturnValue({
          name: 'any_name',
          email: 'any_email',
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

    const service = new SignIn(userRepositoriesInstance, cryptProviderMock);

    // Act
    try {
      await service.execute('any_email', 'any_password');
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('User not exists');
    }
  });

  it('Should throw error when user not exists', async () => {
    // Arrange
    const mockPrisma = {
      user: {
        findUnique: jest.fn().mockReturnValue(null),
      },
    };
    const userMockPrisma = createMockPrisma(mockPrisma);
    const userRepositoriesInstance = new UserRepositories(userMockPrisma);
    const cryptProviderMock: ICrypt = {
      hash: jest.fn().mockResolvedValue('hashed_password'),
      compare: jest.fn(),
    };
    const service = new SignIn(userRepositoriesInstance, cryptProviderMock);

    // Act
    try {
      await service.execute('any_email', 'any_password');
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('User not exists');
    }
  });
});
