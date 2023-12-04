/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from 'zod';

import UserRepositories from '../../../../shared/database/repositories/user';
import { ICrypt } from '../../../../shared/interfaces/crypt';
import { IToken } from '../../../../shared/interfaces/token';
import verifyObject from '../../../../shared/utils-test/verifyObject';
import SignUp, { ISignUpService } from './SignUpService';

const signUpServiceSchema = z.object({
  name: z.string(),
  email: z.string(),
  id: z.string(),
});

describe('SignUp Service', () => {
  let service: ISignUpService;
  let spy = {
    'userRepositories.create': {} as jest.SpiedFunction<
      UserRepositories['create']
    >,
    'userRepositories.findUnique': {} as jest.SpiedFunction<
      UserRepositories['findUnique']
    >,
    'cryptProvider.compare': {} as jest.SpiedFunction<ICrypt['compare']>,
    'tokenProvider.verify': {} as jest.SpiedFunction<IToken['verify']>,
  };

  beforeEach(() => {
    const userRepositoriesInstance = {
      create: jest.fn(),
      findUnique: jest.fn(),
    } as unknown as UserRepositories;

    const cryptProviderInstance = {
      hash: jest.fn().mockResolvedValue('hashed_password'),
      compare: jest.fn(),
    } as unknown as ICrypt;

    const tokenProviderInstance = {
      generate: jest.fn().mockReturnValue('generate_token'),
      verify: jest.fn(),
    } as unknown as IToken;

    spy = {
      'userRepositories.create': jest.spyOn(userRepositoriesInstance, 'create'),
      'userRepositories.findUnique': jest.spyOn(
        userRepositoriesInstance,
        'findUnique'
      ),
      'cryptProvider.compare': jest.spyOn(cryptProviderInstance, 'compare'),
      'tokenProvider.verify': jest.spyOn(tokenProviderInstance, 'verify'),
    };

    service = new SignUp(
      userRepositoriesInstance,
      cryptProviderInstance,
      tokenProviderInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return user when email is not in use', async () => {
    // Arrange
    spy['userRepositories.findUnique'].mockResolvedValue(null);
    spy['userRepositories.create'].mockResolvedValue({
      email: 'any_email',
      name: 'any_name',
      id: 'any_id',
      password: 'any_password',
    });

    // Act
    const user = await service.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
    });
    const result = verifyObject(signUpServiceSchema, user);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should throw error when email is in use', async () => {
    // Arrange
    spy['userRepositories.findUnique'].mockResolvedValue({
      email: 'any_email',
      id: 'any_id',
      name: 'any_name',
      password: 'any_password',
    });

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
