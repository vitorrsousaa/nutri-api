import UserRepositories from '../../../../shared/database/repositories/user';
import AppError from '../../../../shared/error';
import { ICrypt } from '../../providers/crypt';

class SignIn {
  constructor(
    private readonly userRepositories: UserRepositories,
    private readonly cryptProvider: ICrypt
  ) {}

  async execute(email: string, password: string) {
    const findUser = await this.userRepositories.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
        name: true,
        id: true,
      },
    });

    if (!findUser) {
      throw new AppError('User not exists', 404);
    }

    const matchPassword = await this.cryptProvider.compare(
      password,
      findUser.password
    );

    if (!matchPassword) {
      throw new AppError('User not exists', 404);
    }

    return {
      name: findUser.name,
      email: findUser.email,
      id: findUser.id,
    };
  }
}

export default SignIn;
