import { IRequest } from '../../../../interfaces/controller';
import { ICreateAntropometricService } from '../../services/CreateAntropometric';

import { CreateController } from './controller';

describe('CreateController', () => {
  let mockRequest: IRequest;
  let controller: CreateController;

  let spy = {
    'service.execute': {} as jest.SpiedFunction<
      ICreateAntropometricService['execute']
    >,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      accountId: 'd8d0c17f-7f09-400a-96c3-32b4f0853946',
      patientId: 'd8d0c17f-7f09-400a-96c3-32b4f0853946',
    } as IRequest;

    const service = {
      execute: () => {},
    } as unknown as ICreateAntropometricService;

    spy = {
      'service.execute': jest.spyOn(service, 'execute'),
    };

    controller = new CreateController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  it('should be return as body the returned by service', async () => {
    // Arrange
    spy['service.execute'].mockResolvedValue({
      id: 'd8d0c17f-7f09-400a-96c3-32b4f0853946',
      userId: 'bcb7678b-1e30-4971-9f4d-0ba4a30908ec',
      patientId: 'a8dd7f87-975b-46c9-803c-58803419a6c3',
      createdAt: new Date('2024-01-18T14:13:01.495Z'),
      updatedAt: new Date('2024-01-21T14:34:12.319Z'),
      weight: 90,
      height: 10,
    });
    mockRequest.body = {
      weight: 90,
      height: 10,
      date: '2024-01-18T14:13:01.495Z',
    };

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response.body).toEqual({
      id: 'd8d0c17f-7f09-400a-96c3-32b4f0853946',
      userId: 'bcb7678b-1e30-4971-9f4d-0ba4a30908ec',
      patientId: 'a8dd7f87-975b-46c9-803c-58803419a6c3',
      createdAt: new Date('2024-01-18T14:13:01.495Z'),
      updatedAt: new Date('2024-01-21T14:34:12.319Z'),
      weight: 90,
      height: 10,
    });
  });
});
