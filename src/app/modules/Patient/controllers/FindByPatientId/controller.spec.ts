import { IRequest } from '../../../../interfaces/controller';
import { IFindByPatientIdService } from '../../services/FindByUserId';

import { FindByPatientIdController } from './controller';

describe('FindByPatientIdController', () => {
  let mockRequest: IRequest;
  let controller: FindByPatientIdController;

  let spy = {
    'service.execute': {} as jest.SpiedFunction<
      IFindByPatientIdService['execute']
    >,
  };

  beforeEach(() => {
    mockRequest = {
      accountId: 'any_user_id',
      patientId: '',
    } as IRequest;

    const service = {
      execute: jest.fn(),
    } as unknown as IFindByPatientIdService;

    spy = {
      'service.execute': jest.spyOn(service, 'execute'),
    };

    controller = new FindByPatientIdController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  it('Should call service with user id and patient id', async () => {
    // Arrange
    mockRequest.accountId = '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33';

    // Act
    await controller.handle(mockRequest);

    // Assert
    expect(spy['service.execute']).toHaveBeenCalledWith({
      userId: 'any_user_id',
      patientId: '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33',
    });
  });

  it('Should call response with data returned of service', async () => {
    // arrange
    mockRequest.accountId = '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33';

    spy['service.execute'].mockResolvedValue({
      birthDate: new Date('2023-10-26T03:00:00.000Z'),
      email: 'any_email',
      gender: 'MASC',
      height: 1.8,
      id: '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33',
      name: 'any_name',
      userId: 'any_user_id',
      weight: 80,
      status: 'ACTIVE',
    });

    // act
    const result = await controller.handle(mockRequest);

    // assert
    expect(result.body).toEqual({
      birthDate: new Date('2023-10-26T03:00:00.000Z'),
      email: 'any_email',
      gender: 'MASC',
      height: 1.8,
      id: '47f9c5f8-6a2d-4f1e-ba47-4cddf2509c33',
      name: 'any_name',
      userId: 'any_user_id',
      weight: 80,
      status: 'ACTIVE',
    });
  });
});
