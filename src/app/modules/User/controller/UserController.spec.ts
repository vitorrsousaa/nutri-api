import { Request, Response } from 'express';

import RecoverUserService from '../service/Recover';
import UserController from './UserController';

describe('UserController', () => {
  let mockResponse: Response;
  let mockRequest: Request;

  let controller: UserController;
  let spy = {
    'recover.execute': {} as jest.SpiedFunction<RecoverUserService['execute']>,
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

    const recoverServiceInstance = {
      execute: jest.fn(),
    } as unknown as RecoverUserService;

    spy = {
      'recover.execute': jest.spyOn(recoverServiceInstance, 'execute'),
    };

    controller = new UserController(recoverServiceInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  describe('Recover controller', () => {
    it('Should call recover service with the user_id', async () => {
      // Arrange
      mockRequest.user = { id: 'any_id' };
      spy['recover.execute'].mockResolvedValueOnce({
        email: 'any_email',
        name: 'any_name',
      });

      // Act
      await controller.recover(mockRequest, mockResponse);

      // Assert
      expect(spy['recover.execute']).toHaveBeenCalledWith('any_id');
    });
  });
});
