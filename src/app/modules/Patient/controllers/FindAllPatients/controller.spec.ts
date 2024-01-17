import { IRequest } from '../../../../interfaces/controller';
import { IFindAllPatientService } from '../../services/FindAll';

import { FindAllPatientsController } from './controller';

describe('FindAllPatientsController', () => {
  let mockRequest: IRequest;
  let controller: FindAllPatientsController;

  let spy = {
    'service.execute': {} as jest.SpiedFunction<
      IFindAllPatientService['execute']
    >,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      accountId: 'any_user_id',
    } as unknown as IRequest;

    const service = {
      execute: jest.fn(),
    } as unknown as IFindAllPatientService;

    spy = {
      'service.execute': jest.spyOn(service, 'execute'),
    };

    controller = new FindAllPatientsController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  it('Should call service with user id', async () => {
    // Arrange

    // Act
    await controller.handle(mockRequest);

    // Assert
    expect(spy['service.execute']).toHaveBeenCalledWith({
      userId: 'any_user_id',
    });
  });

  it('should call response with data returned of service', async () => {
    // arrange
    const date = new Date();
    spy['service.execute'].mockResolvedValue([
      {
        birthDate: date,
        email: 'any_email',
        name: 'any_name',
        gender: 'MASC',
        height: 1.8,
        weight: 80,
        id: 'any_id',
        userId: 'any_user_id',
        status: 'ACTIVE',
      },
    ]);

    // act
    const result = await controller.handle(mockRequest);

    // assert
    expect(result.body).toEqual([
      {
        birthDate: date,
        email: 'any_email',
        name: 'any_name',
        gender: 'MASC',
        height: 1.8,
        weight: 80,
        id: 'any_id',
        userId: 'any_user_id',
        status: 'ACTIVE',
      },
    ]);
  });
});
