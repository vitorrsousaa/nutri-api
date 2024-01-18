import { IRequest } from '../../../../interfaces/controller';
import { IDeleteService } from '../../services/Delete';

import { DeletePatientController } from './controller';

describe('DeletePatientController', () => {
  let mockRequest: IRequest;
  let controller: DeletePatientController;

  let spy = {
    'service.execute': {} as jest.SpiedFunction<IDeleteService['execute']>,
  };

  beforeEach(() => {
    mockRequest = {
      accountId: 'accountId',
    } as IRequest;

    const service = {
      execute: jest.fn(),
    } as unknown as IDeleteService;

    spy = {
      'service.execute': jest.spyOn(service, 'execute'),
    };

    controller = new DeletePatientController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  it('Should call service with user id and patient id', async () => {
    // Arrange
    mockRequest.patientId = '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33';

    // Act
    await controller.handle(mockRequest);

    // Assert
    expect(spy['service.execute']).toHaveBeenCalledWith({
      userId: 'accountId',
      patientId: '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33',
    });
  });

  it('Should call response with status 204', async () => {
    // arrange
    mockRequest.patientId = '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33';
    spy['service.execute'].mockResolvedValue(null);

    // act
    const result = await controller.handle(mockRequest);

    // assert
    expect(result.body).toBeNull();
  });
});
