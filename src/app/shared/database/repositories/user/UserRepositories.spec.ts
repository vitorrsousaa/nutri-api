import { createMockPrisma } from '../../../utils-test/createMockPrisma';
import UserRepositories from './UserRepositories';

describe('User Repositories', () => {
  it('Should correctly create user', async () => {
    // Arrange
    const mock = {
      user: {
        create: jest.fn(),
      },
    };
    const prismaMock = createMockPrisma(mock);
    const repository = new UserRepositories(prismaMock);

    // Act
    await repository.create({
      data: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password',
      },
    });

    // Assert
    expect(mock.user.create).toBeCalledWith({
      data: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password',
      },
    });
  });

  it('Should call correctly findUnique by email', async () => {
    // Arrange
    const mock = {
      user: {
        findUnique: jest.fn(),
      },
    };
    const prismaMock = createMockPrisma(mock);
    const repository = new UserRepositories(prismaMock);

    // Act
    await repository.findUnique({
      where: {
        email: 'any_email',
      },
    });

    // Assert
    expect(mock.user.findUnique).toBeCalledWith({
      where: { email: 'any_email' },
    });
  });

  it('Should call correctly findUnique by id', async () => {
    // Arrange
    const mock = {
      user: {
        findUnique: jest.fn(),
      },
    };
    const prismaMock = createMockPrisma(mock);
    const repository = new UserRepositories(prismaMock);

    // Act
    await repository.findUnique({
      where: {
        id: 'any_id',
      },
    });

    // Assert
    expect(mock.user.findUnique).toBeCalledWith({
      where: { id: 'any_id' },
    });
  });
});
