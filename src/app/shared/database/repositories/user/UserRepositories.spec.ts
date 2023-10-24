import { createMockPrisma } from '../../../utils-test/createMockPrisma';
import UserRepositories from './UserRepositories';

describe('User Repositories', () => {
  let repository: UserRepositories;

  const spy = {
    create: jest.fn(),
    findUnique: jest.fn(),
  };

  beforeEach(() => {
    const mock = {
      user: spy,
    };

    const prismaMock = createMockPrisma(mock);
    repository = new UserRepositories(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should correctly create user', async () => {
    // Arrange
    const createMock = {
      data: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password',
      },
    };

    // Act
    await repository.create(createMock);

    // Assert
    expect(spy.create).toBeCalledWith(createMock);
  });

  it('Should call correctly findUnique by email', async () => {
    // Arrange
    const mockFindUnique = {
      where: {
        email: 'any_email',
      },
    };

    // Act
    await repository.findUnique(mockFindUnique);

    // Assert
    expect(spy.findUnique).toBeCalledWith(mockFindUnique);
  });
});
