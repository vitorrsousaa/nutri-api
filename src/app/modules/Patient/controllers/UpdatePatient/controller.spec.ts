import { IRequest } from '../../../../interfaces/controller';
import { IUpdatePatientService } from '../../services/Update';

import { UpdatePatientController } from './controller';

describe('UpdatePatientController', () => {
  let mockRequest: IRequest;
  let controller: UpdatePatientController;

  let spy = {
    'service.execute': {} as jest.SpiedFunction<
      IUpdatePatientService['execute']
    >,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
      accountId: 'any_user_id',
    } as IRequest;

    const service = {
      execute: jest.fn(),
    } as unknown as IUpdatePatientService;

    spy = {
      'service.execute': jest.spyOn(service, 'execute'),
    };

    controller = new UpdatePatientController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  it('Should call service with user id, patient id and patient information', async () => {
    // Arrange
    mockRequest.patientId = '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33';

    mockRequest.body = {
      email: 'any_email@email.com',
      name: 'any_name',
      height: 150,
    };

    // Act
    await controller.handle(mockRequest);

    // Assert
    expect(spy['service.execute']).toHaveBeenCalledWith({
      patient: {
        email: 'any_email@email.com',
        name: 'any_name',
        height: 150,
      },
      userId: 'any_user_id',
      patientId: '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33',
    });
  });
});
