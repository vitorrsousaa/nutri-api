import { IRequest } from '../../../../interfaces/controller';
import { IRecoverUserService } from '../../services/Recover';

import { RecoverUserController } from './RecoverUserController';

describe('Recover user controller', () => {
  let mockRequest: IRequest;
  let controller: RecoverUserController;

  let spy = {
    'recoverUserService.execute': {} as jest.SpiedFunction<
      IRecoverUserService['execute']
    >,
  };

  beforeEach(() => {
    const recoverUserServiceInstance = {
      execute: jest.fn(),
    } as unknown as IRecoverUserService;

    mockRequest = {
      params: {},
    } as unknown as IRequest;

    spy = {
      'recoverUserService.execute': jest.spyOn(
        recoverUserServiceInstance,
        'execute'
      ),
    };

    controller = new RecoverUserController(recoverUserServiceInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();

    mockRequest.params = {};
  });

  it('Should call response with returned of service', async () => {
    // Arrange
    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    spy['recoverUserService.execute'].mockResolvedValue({
      email: 'any_email@email.com',
      id: '4b429c9e-7562-421a-9aa9-669e1b380b7a',
      name: 'any_name',
    });

    // Act

    const response = await controller.handle(mockRequest);

    // Assert

    expect(response).toEqual({
      statusCode: 200,
      body: {
        email: 'any_email@email.com',
        id: '4b429c9e-7562-421a-9aa9-669e1b380b7a',
        name: 'any_name',
      },
    });
  });
});
