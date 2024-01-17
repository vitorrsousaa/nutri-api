import { IRequest } from '../../../../interfaces/controller';
import { ZodError } from '../../../../shared/error';
import { ISignUpService } from '../../services/SignUp';

import { SignUpController } from './SignUpController';

describe('Sign up controller', () => {
  let mockRequest: IRequest;

  let controller: SignUpController;

  let spy = {
    'signUpService.execute': {} as jest.SpiedFunction<
      ISignUpService['execute']
    >,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
    } as unknown as IRequest;

    const signUpServiceInstance = {
      execute: jest.fn(),
    } as unknown as ISignUpService;

    spy = {
      'signUpService.execute': jest.spyOn(signUpServiceInstance, 'execute'),
    };

    controller = new SignUpController(signUpServiceInstance);
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
      if (error instanceof ZodError) {
        expect(error.message.some((error) => error.field === 'email'));
      }
    }
  });

  it('Should return user when fields are correctly', async () => {
    // Arrange
    spy['signUpService.execute'].mockResolvedValue({
      name: 'any_name',
      email: 'any_email@email.com',
      id: 'any_id',
      token: 'any_token',
    });

    const mockAuthenticate = {
      email: 'any_email@email.com',
      password: 'any_password',
      name: 'any_name',
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
