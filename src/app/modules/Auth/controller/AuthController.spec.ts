/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';

import { ZodError } from '../../../shared/error';
import { ISignInService } from '../services/SignIn';
import { ISignUpService } from '../services/SignUp';
import AuthController from './AuthController';

describe('Auth Controller', () => {
  let mockResponse: Response;
  let mockRequest: Request;

  let controller: AuthController;
  let spy = {
    'signInService.execute': {} as jest.SpiedFunction<
      ISignInService['execute']
    >,
    'signUpService.execute': {} as jest.SpiedFunction<
      ISignUpService['execute']
    >,
  };

  beforeEach(() => {
    mockResponse = {
      json: jest.fn(),
      sendStatus: jest.fn().mockReturnThis(),
    } as unknown as Response;
    mockRequest = {
      user: {},
      body: {},
    } as unknown as Request;

    const signInServiceInstance = {
      execute: jest.fn(),
    } as unknown as ISignInService;

    const signUpServiceInstance = {
      execute: jest.fn(),
    } as unknown as ISignUpService;

    spy = {
      'signInService.execute': jest.spyOn(signInServiceInstance, 'execute'),
      'signUpService.execute': jest.spyOn(signUpServiceInstance, 'execute'),
    };

    controller = new AuthController(
      signUpServiceInstance,
      signInServiceInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  describe('Sign up controller', () => {
    beforeEach(() => {
      spy['signUpService.execute'].mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should return error when missing fields in authenticate', async () => {
      // Arrange
      const mockAuthenticate = {
        password: 'any_password',
      };

      mockRequest.body = { ...mockAuthenticate };

      // Act
      try {
        await controller.signUp(mockRequest, mockResponse);
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
      await controller.signUp(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.json).toBeCalledWith({
        name: 'any_name',
        email: 'any_email@email.com',
        id: 'any_id',
        token: 'any_token',
      });
    });
  });

  describe('Sign in controller', () => {
    beforeEach(() => {
      spy['signInService.execute'].mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should return error when missing fields in authenticate', async () => {
      // Arrange
      const mockAuthenticate = {
        password: 'any_password',
      };

      mockRequest.body = { ...mockAuthenticate };

      // Act
      try {
        await controller.signIn(mockRequest, mockResponse);
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
      await controller.signIn(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.json).toBeCalledWith({
        name: 'any_name',
        email: 'any_email@email.com',
        id: 'any_id',
        token: 'any_token',
      });
    });
  });
});
