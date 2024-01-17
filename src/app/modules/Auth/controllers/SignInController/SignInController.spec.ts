import { IRequest } from '@godiet-interfaces/controller';

import { ZodError } from '../../../../shared/error';
import { ISignInService } from '../../services/SignIn';

import { SignInController } from './SignInController';

describe('Sign in controller', () => {
  let mockRequest: IRequest;
  let controller: SignInController;

  const spy = {
    'signInService.execute': {} as jest.SpiedFunction<
      ISignInService['execute']
    >,
  };

  beforeEach(() => {
    const signInServiceInstance = {
      execute: jest.fn(),
    } as unknown as ISignInService;

    mockRequest = {
      body: {},
    } as unknown as IRequest;

    spy['signInService.execute'] = jest.spyOn(signInServiceInstance, 'execute');

    controller = new SignInController(signInServiceInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  it('Should return error when missing fields in authenticate', async () => {
    // Arrange
    const mockAuthenticate = {
      password: 'any_password',
    };

    mockRequest.body = { ...mockAuthenticate };

    // Act
    try {
      await controller.handle(mockRequest);
    } catch (error) {
      // Assert
      if (error instanceof ZodError) {
        expect(error.message.some((error) => error.field === 'email'));
      }
    }
  });

  it('Should return user when fields are correctly', async () => {
    // Arrange
    spy['signInService.execute'].mockResolvedValue({
      name: 'any_name',
      email: 'any_email@email.com',
      id: 'any_id',
      token: 'any_token',
    });

    const mockAuthenticate = {
      email: 'any_email@email.com',
      password: 'any_password',
    };

    mockRequest.body = { ...mockAuthenticate };

    // Act
    const result = await controller.handle(mockRequest);

    // Assert
    expect(result.body).toEqual({
      name: 'any_name',
      email: 'any_email@email.com',
      id: 'any_id',
      token: 'any_token',
    });
  });
});
