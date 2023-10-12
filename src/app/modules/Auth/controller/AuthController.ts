import { Request, Response } from 'express';

import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import { CreateUserSchema } from '../dtos/create-user-dto';
import { UserSchema } from '../entities/TUser';
import SignIn from '../services/SignIn';
import SignUp from '../services/SignUp';

class AuthController {
  constructor(
    private readonly signUpService: SignUp,
    private readonly signInService: SignIn
  ) {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  async signUp(request: Request, response: Response) {
    const result = returnErrorMissingField(CreateUserSchema, request.body);

    const { email, password, name } = result;

    const signUp = await this.signUpService.execute({ email, name, password });

    return response.json(signUp);
  }

  async signIn(request: Request, response: Response) {
    const result = returnErrorMissingField(UserSchema, request.body);

    const { email, password } = result;

    const signIn = await this.signInService.execute(email, password);

    return response.json(signIn);
  }
}

export default AuthController;
