import UserRepositories from '../../../../shared/database/repositories/user';
import { AppError } from '../../../../shared/error';

export interface IRecoverUserService {
  execute(
    recoverUserInput: IRecoverUserServiceInput
  ): Promise<IRecoverUserServiceOutput>;
}

export interface IRecoverUserServiceInput {
  userId: string;
}

export interface IRecoverUserServiceOutput {
  email: string;
  name: string;
  id: string;
}

export class RecoverUserService implements IRecoverUserService {
  constructor(private readonly userRepositories: UserRepositories) {}

  async execute(
    recoverUserInput: IRecoverUserServiceInput
  ): Promise<IRecoverUserServiceOutput> {
    const { userId } = recoverUserInput;

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
