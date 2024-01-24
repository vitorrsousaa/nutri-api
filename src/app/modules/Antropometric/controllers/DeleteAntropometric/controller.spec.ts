import { IRequest } from '../../../../interfaces/controller';
import { IDeleteAntropometricService } from '../../services/DeleteAntropometric';

import { DeleteAntropometricController } from './controller';

describe('DeleteAntropometricController', () => {
  let mockRequest: IRequest;

  let controller: DeleteAntropometricController;

  let spy = {
    'service.execute': {} as jest.SpiedFunction<
      IDeleteAntropometricService['execute']
    >,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      patientId: 'patientId',
      accountId: 'accountId',
    } as IRequest;

    const service = {
      execute: () => {},
    } as unknown as IDeleteAntropometricService;

    spy = {
      'service.execute': jest.spyOn(service, 'execute'),
    };

    controller = new DeleteAntropometricController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  });

  it('should be defined', async () => {
    // Arrange
    spy['service.execute'].mockResolvedValue(null);

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response.body).toBeNull();
  });
});
