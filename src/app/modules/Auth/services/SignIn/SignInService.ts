import * as z from 'zod';

import UserRepositories from '../../../../shared/database/repositories/user';
import { AppError } from '../../../../shared/error';
import { ICrypt } from '../../../../shared/interfaces/crypt';
import { IToken } from '../../../../shared/interfaces/token';

interface ISignInServiceOutput {
  name: string;
  email: string;
  id: string;
  token: string;
}

export const UserSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail format' }),
  password: z.string().min(8),
});

export type TUser = z.infer<typeof UserSchema>;

export interface ISignInServiceInput {
  user: TUser;
}

export interface ISignInService {
  execute(
    signInServiceInput: ISignInServiceInput
  ): Promise<ISignInServiceOutput>;
}

class SignIn implements ISignInService {
  constructor(
    private readonly userRepositories: UserRepositories,
    private readonly cryptProvider: ICrypt,
    private readonly tokenProvider: IToken
  ) {}

  async execute(
    signInServiceInput: ISignInServiceInput
  ): Promise<ISignInServiceOutput> {
    const { user } = signInServiceInput;
    const { email, password } = user;

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
      token: this.tokenProvider.generate({ id: findUser.id }),
    };
  }
}

export default SignIn;
