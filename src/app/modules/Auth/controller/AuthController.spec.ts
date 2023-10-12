/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';

import { ZodError } from '../../../shared/error';
import SignIn from '../services/SignIn';
import SignUp from '../services/SignUp';
import AuthController from './AuthController';

describe('Auth Controller', () => {
  let mockResponse: Response;
  let mockRequest: Request;

  beforeEach(() => {
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    mockRequest = {
      user: {},
      body: {},
    } as unknown as Request;
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  describe('Sign up controller', () => {
    it('Should return error when missing fields in authenticate', async () => {
      // Arrange
      const signInServiceMock = {
        execute: jest.fn(),
      } as unknown as jest.Mocked<SignIn>;

      // const recoverServiceMock = {
      //   execute: jest.fn(),
      // } as unknown as jest.Mocked<Recover>;

      const signUpServiceMock = {
        execute: jest.fn(),
      } as unknown as jest.Mocked<SignUp>;

      const controller = new AuthController(
        // recoverServiceMock,
        signUpServiceMock,
        signInServiceMock
      );

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
      const signInServiceMock = {
        execute: jest.fn(),
      } as unknown as jest.Mocked<SignIn>;

      // const recoverServiceMock = {
      //   execute: jest.fn(),
      // } as unknown as jest.Mocked<Recover>;

      const signUpServiceMock = {
        execute: jest
          .fn()
          .mockReturnValue({ name: 'any_name', email: 'any_email@email.com' }),
      } as unknown as jest.Mocked<SignUp>;

      const controller = new AuthController(
        // recoverServiceMock,
        signUpServiceMock,
        signInServiceMock
      );

      const mockAuthenticate = {
        email: 'any_email@email.com',
        password: 'any_password',
        name: 'any_name',
      };

      mockRequest.body = { ...mockAuthenticate };

      // Act
      await controller.signUp(mockRequest, mockResponse);

      // Assert
      expect(signUpServiceMock.execute).toBeCalledWith({
        email: 'any_email@email.com',
        password: 'any_password',
        name: 'any_name',
      });
      expect(mockResponse.json).toBeCalledWith({
        name: 'any_name',
        email: 'any_email@email.com',
      });
    });
  });

  describe('Sign in controller', () => {
    it('Should return error when missing fields in authenticate', async () => {
      // Arrange
      const signInServiceMock = {
        execute: jest.fn(),
      } as unknown as jest.Mocked<SignIn>;

      // const recoverServiceMock = {
      //   execute: jest.fn(),
      // } as unknown as jest.Mocked<Recover>;

      const signUpServiceMock = {
        execute: jest.fn(),
      } as unknown as jest.Mocked<SignUp>;

      const controller = new AuthController(
        // recoverServiceMock,
        signUpServiceMock,
        signInServiceMock
      );

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
      const signInServiceMock = {
        execute: jest
          .fn()
          .mockReturnValue({ name: 'any_name', email: 'any_email@email.com' }),
      } as unknown as jest.Mocked<SignIn>;

      // const recoverServiceMock = {
      //   execute: jest.fn(),
      // } as unknown as jest.Mocked<Recover>;

      const signUpServiceMock = {
        execute: jest.fn(),
      } as unknown as jest.Mocked<SignUp>;

      const controller = new AuthController(
        // recoverServiceMock,
        signUpServiceMock,
        signInServiceMock
      );

      const mockAuthenticate = {
        email: 'any_email@email.com',
        password: 'any_password',
      };

      mockRequest.body = { ...mockAuthenticate };

      // Act
      await controller.signIn(mockRequest, mockResponse);

      // Assert
      expect(signInServiceMock.execute).toBeCalledWith(
        'any_email@email.com',
        'any_password'
      );
      expect(mockResponse.json).toBeCalledWith({
        name: 'any_name',
        email: 'any_email@email.com',
      });
    });
  });
});
