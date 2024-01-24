import { IRequest } from '../../../../interfaces/controller';
import { IFindAllAntropometricService } from '../../services/FindAllAntropometric';

import { FindAllController } from './controller';

describe('FindAllController', () => {
  let mockRequest: IRequest;
  let controller: FindAllController;

  let spy = {
    'service.execute': {} as jest.SpiedFunction<
      IFindAllAntropometricService['execute']
    >,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      patientId: '657cb359-1b94-4f37-93e6-131a37404dc7',
      accountId: '657cb359-1b94-4f37-93e6-131a37404dc7',
    } as IRequest;

    const service = {
      execute: jest.fn(),
    } as unknown as IFindAllAntropometricService;

    spy = {
      'service.execute': jest.spyOn(service, 'execute'),
    };

    controller = new FindAllController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  it('should be defined', async () => {
    // Arrange
    spy['service.execute'].mockResolvedValue([]);

    // Act
    const result = await controller.handle(mockRequest);

    // Assert
    expect(result.body).toEqual([]);
  });
});
