import { IRequest } from '../../../../interfaces/controller';
import FindAllService from '../../services/FindAllByUser';

import { FindAllAnamnesisTemplateByUserController } from './FindAllAnamnesisTemplateByUser';

describe('Find all anamnesis template by user controller', () => {
  let mockRequest: IRequest;
  let controller: FindAllAnamnesisTemplateByUserController;
  let spy = {
    'findAllAnamnesisTemplateByUserService.execute': {} as jest.SpiedFunction<
      FindAllService['execute']
    >,
  };

  beforeEach(() => {
    const findAllServiceInstance = {
      execute: jest.fn(),
    } as unknown as FindAllService;

    mockRequest = {
      params: {},
    } as unknown as IRequest;

    spy = {
      'findAllAnamnesisTemplateByUserService.execute': jest.spyOn(
        findAllServiceInstance,
        'execute'
      ),
    };

    controller = new FindAllAnamnesisTemplateByUserController(
      findAllServiceInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.params = {};
  });

  it('Should call response with returned of service', async () => {
    // Arrange
    const date = new Date();
    spy['findAllAnamnesisTemplateByUserService.execute'].mockResolvedValue([
      {
        createdAt: date,
        id: 'any_id',
        title: 'any_name',
        userId: 'any_user_id',
        text: 'any_text',
        updatedAt: date,
      },
    ]);

    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 200,
      body: [
        {
          createdAt: date,
          id: 'any_id',
          title: 'any_name',
          userId: 'any_user_id',
          text: 'any_text',
          updatedAt: date,
        },
      ],
    });
  });
});
