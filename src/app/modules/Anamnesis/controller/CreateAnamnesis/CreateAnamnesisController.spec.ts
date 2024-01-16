import { IRequest } from '@godiet-interfaces/controller';

import { ICreateAnamnesisService } from '../../services/CreateAnamnesis';

import { CreateAnamnesisController } from './CreateAnamnesisController';

describe('Create anamnesis controller', () => {
  let mockRequest: IRequest;
  let controller: CreateAnamnesisController;
  let spy = {
    'createAnamnesisService.execute': {} as jest.SpiedFunction<
      ICreateAnamnesisService['execute']
    >,
  };

  beforeEach(() => {
    const createAnamnesisServiceInstance = {
      execute: jest.fn(),
    } as unknown as ICreateAnamnesisService;

    mockRequest = {
      params: {},
    } as unknown as IRequest;

    spy = {
      'createAnamnesisService.execute': jest.spyOn(
        createAnamnesisServiceInstance,
        'execute'
      ),
    };

    controller = new CreateAnamnesisController(createAnamnesisServiceInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.params = {};
  });

  it('Should call response with returned of service', async () => {
    // Arrange
    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    mockRequest.patientId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    mockRequest.body = {
      title: 'any_title',
      text: 'any_text',
    };
    spy['createAnamnesisService.execute'].mockResolvedValue({
      id: 'cfa64408-ba83-4311-be71-e865f7d63535',
      userId: '529e7968-7300-4b63-a582-eda5eb4c7508',
      patientId: '30c26fe6-d70e-420e-83b3-ac45374a0364',
      createdAt: '2024-01-09T16:32:57.700Z',
      updatedAt: '2024-01-09T16:32:57.700Z',
      text: 'joaquim',
      title: 'title',
    });

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 200,
      body: {
        id: 'cfa64408-ba83-4311-be71-e865f7d63535',
        userId: '529e7968-7300-4b63-a582-eda5eb4c7508',
        patientId: '30c26fe6-d70e-420e-83b3-ac45374a0364',
        createdAt: '2024-01-09T16:32:57.700Z',
        updatedAt: '2024-01-09T16:32:57.700Z',
        text: 'joaquim',
        title: 'title',
      },
    });
  });
});
