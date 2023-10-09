import UserRepositories from '../../../../shared/database/repositories/user';
import AppError from '../../../../shared/error';
import { createUserDTO } from '../../dtos';
import { ICrypt } from '../../providers/crypt';

class SignUp {
  constructor(
    private readonly userRepositories: UserRepositories,
    private readonly cryptProvider: ICrypt
  ) {}

  async execute(createUserDTO: createUserDTO) {
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
    };
  }
}

export default SignUp;