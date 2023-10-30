import { Request, Response } from 'express';

import { ZodError } from '../../../shared/error';
import CreatePatientService from '../services/Create';
import DeletePatientService from '../services/Delete';
import FindAllPatient from '../services/FindAll';
import FindByPatientId from '../services/FindByUserId';
import PatientController from './PatientController';

describe('Patient Controller', () => {
  let mockResponse: Response;
  let mockRequest: Request;

  let controller: PatientController;
  let spy = {
    'createPatientService.execute': {} as jest.SpiedFunction<
      CreatePatientService['execute']
    >,
    'findAllPatientService.execute': {} as jest.SpiedFunction<
      FindAllPatient['execute']
    >,
    'findByPatientIdService.execute': {} as jest.SpiedFunction<
      FindByPatientId['execute']
    >,
    'deletePatientService.execute': {} as jest.SpiedFunction<
      DeletePatientService['execute']
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

    const createPatientServiceInstance = {
      execute: jest.fn(),
    } as unknown as CreatePatientService;

    const findByPatientIdServiceInstance = {
      execute: jest.fn(),
    } as unknown as FindByPatientId;

    const findAllPatientServiceInstance = {
      execute: jest.fn(),
    } as unknown as FindAllPatient;

    const deletePatientServiceInstance = {
      execute: jest.fn(),
    } as unknown as DeletePatientService;

    spy = {
      'createPatientService.execute': jest.spyOn(
        createPatientServiceInstance,
        'execute'
      ),
      'findAllPatientService.execute': jest.spyOn(
        findAllPatientServiceInstance,
        'execute'
      ),
      'findByPatientIdService.execute': jest.spyOn(
        findByPatientIdServiceInstance,
        'execute'
      ),
      'deletePatientService.execute': jest.spyOn(
        deletePatientServiceInstance,
        'execute'
      ),
    };

    controller = new PatientController(
      createPatientServiceInstance,
      findByPatientIdServiceInstance,
      findAllPatientServiceInstance,
      deletePatientServiceInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  describe('Create patient controller', () => {
    beforeEach(() => {
      spy['createPatientService.execute'].mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should throw error when missing fields', async () => {
      // Arrange
      mockRequest.body = {
        birthDate: 'any_birthDate',
        gender: 'MASC',
        height: 1.8,
        name: 'any_name',
        weight: 80,
      };

      // Act
      try {
        await controller.create(mockRequest, mockResponse);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.message.some((error) => error.field === 'email'));
        }
      }
    });

    it('should call service with data patient and user id', async () => {
      // arrange
      const date = new Date('2023-10-26T03:00:00.000Z');
      mockRequest.body = {
        birthDate: date.toString(),
        gender: 'MASC',
        height: 1.8,
        name: 'any_name',
        weight: 80,
        email: 'email@email.com',
      };

      mockRequest.user = { id: 'any_user_id' };

      // act
      try {
        await controller.create(mockRequest, mockResponse);
      } catch (error) {
        console.log(error);
      }

      // assert
      expect(spy['createPatientService.execute']).toBeCalledWith(
        {
          birthDate: date,
          gender: 'MASC',
          height: 1.8,
          name: 'any_name',
          weight: 80,
          email: 'email@email.com',
        },
        'any_user_id'
      );
    });

    it('should call response with data returned of service', async () => {
      // arrange
      const date = new Date();
      mockRequest.body = {
        birthDate: 'Fri Oct 26 2023',
        gender: 'MASC',
        height: 1.8,
        name: 'any_name',
        weight: 80,
        email: 'email@email.com',
      };

      spy['createPatientService.execute'].mockResolvedValue({
        birthDate: date,
        email: 'any_email',
        name: 'any_name',
        gender: 'MASC',
        height: 1.8,
        weight: 80,
        id: 'any_id',
        userId: 'any_user_id',
      });

      // act
      await controller.create(mockRequest, mockResponse);

      // assert
      expect(mockResponse.json).toBeCalledWith({
        birthDate: date,
        email: 'any_email',
        name: 'any_name',
        gender: 'MASC',
        height: 1.8,
        weight: 80,
        id: 'any_id',
        userId: 'any_user_id',
      });
    });
  });

  describe('Find all patient controller', () => {
    beforeEach(() => {
      spy['findAllPatientService.execute'].mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should call service with user id', async () => {
      // Arrange
      mockRequest.user = { id: 'any_user_id' };

      // Act
      await controller.findAll(mockRequest, mockResponse);

      // Assert
      expect(spy['findAllPatientService.execute']).toHaveBeenCalledWith(
        'any_user_id'
      );
    });

    it('should call response with data returned of service', async () => {
      // arrange
      const date = new Date();
      spy['findAllPatientService.execute'].mockResolvedValue([
        {
          birthDate: date,
          email: 'any_email',
          name: 'any_name',
          gender: 'MASC',
          height: 1.8,
          weight: 80,
          id: 'any_id',
          userId: 'any_user_id',
        },
      ]);

      // act
      await controller.findAll(mockRequest, mockResponse);

      // assert
      expect(mockResponse.json).toBeCalledWith([
        {
          birthDate: date,
          email: 'any_email',
          name: 'any_name',
          gender: 'MASC',
          height: 1.8,
          weight: 80,
          id: 'any_id',
          userId: 'any_user_id',
        },
      ]);
    });
  });

  describe('Find by patient id controller', () => {
    beforeEach(() => {
      spy['findByPatientIdService.execute'].mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should return error when params is missing', async () => {
      // Arrange
      mockRequest.params = {
        id: 'any_id',
      };

      // Act
      try {
        await controller.findByUserId(mockRequest, mockResponse);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.message.some((error) => error.field === 'id'));
        }
      }
    });

    it('Should call service with user id and patient id', async () => {
      // Arrange
      mockRequest.params = {
        id: '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33',
      };

      mockRequest.user = { id: 'any_user_id' };

      // Act
      await controller.findByUserId(mockRequest, mockResponse);

      // Assert
      expect(spy['findByPatientIdService.execute']).toHaveBeenCalledWith(
        'any_user_id',
        '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33'
      );
    });

    it('Should call response with data returned of service', async () => {
      // arrange
      mockRequest.params = {
        id: '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33',
      };

      mockRequest.user = { id: 'any_user_id' };

      spy['findByPatientIdService.execute'].mockResolvedValue({
        birthDate: new Date('2023-10-26T03:00:00.000Z'),
        email: 'any_email',
        gender: 'MASC',
        height: 1.8,
        id: '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33',
        name: 'any_name',
        userId: 'any_user_id',
        weight: 80,
      });

      // act
      await controller.findByUserId(mockRequest, mockResponse);

      // assert
      expect(mockResponse.json).toBeCalledWith({
        birthDate: new Date('2023-10-26T03:00:00.000Z'),
        email: 'any_email',
        gender: 'MASC',
        height: 1.8,
        id: '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33',
        name: 'any_name',
        userId: 'any_user_id',
        weight: 80,
      });
    });
  });

  describe('Delete patient controller', () => {
    beforeEach(() => {
      spy['deletePatientService.execute'].mockClear();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should return error when params is missing', async () => {
      // Arrange
      mockRequest.params = {
        id: 'any_id',
      };

      // Act
      try {
        await controller.delete(mockRequest, mockResponse);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.message.some((error) => error.field === 'id'));
        }
      }
    });

    it('Should call service with user id and patient id', async () => {
      // Arrange
      mockRequest.params = {
        id: '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33',
      };

      mockRequest.user = { id: 'any_user_id' };

      // Act
      await controller.delete(mockRequest, mockResponse);

      // Assert
      expect(spy['deletePatientService.execute']).toHaveBeenCalledWith(
        'any_user_id',
        '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33'
      );
    });

    it('Should call response with status 204', async () => {
      // arrange
      mockRequest.params = {
        id: '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33',
      };

      mockRequest.user = { id: 'any_user_id' };

      spy['deletePatientService.execute'].mockResolvedValue(null);

      // act
      await controller.delete(mockRequest, mockResponse);

      // assert
      expect(mockResponse.sendStatus).toBeCalledWith(204);
    });
  });
});
