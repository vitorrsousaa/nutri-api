import UserRepositories from '../../../../shared/database/repositories/user';
import { AppError } from '../../../../shared/error';

export class RecoverUserService {
  constructor(private readonly userRepositories: UserRepositories) {}

  async execute(userId: string) {
    const findUser = await this.userRepositories.findUnique({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      throw new AppError('User not exists', 404);
    }

    return {
      email: findUser.email,
      name: findUser.name,
      id: findUser.id,
    };
  }
}
