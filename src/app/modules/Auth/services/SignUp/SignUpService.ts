import UserRepositories from '../../../../shared/database/repositories/user';
import { AppError } from '../../../../shared/error';
import { ICrypt } from '../../../../shared/interfaces/crypt';
import { IToken } from '../../../../shared/interfaces/token';
import { createUserDTO } from '../../dtos/create-user-dto';

interface ISignUpServiceOutput {
  name: string;
  email: string;
  id: string;
  token: string;
}

export interface ISignUpService {
  execute(createUserDTO: createUserDTO): Promise<ISignUpServiceOutput>;
}

class SignUp implements ISignUpService {
  constructor(
    private readonly userRepositories: UserRepositories,
    private readonly cryptProvider: ICrypt,
    private readonly tokenProvider: IToken
  ) {}

  async execute(createUserDTO: createUserDTO): Promise<ISignUpServiceOutput> {
    const { email, name, password } = createUserDTO;

    const findUser = await this.userRepositories.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (findUser) {
      throw new AppError('Email already in use');
    }

    const hashedPassword = await this.cryptProvider.hash(password);

    const newUser = await this.userRepositories.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: this.tokenProvider.generate({ id: newUser.id }),
    };
  }
}

export default SignUp;
