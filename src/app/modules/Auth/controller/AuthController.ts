import { Request, Response } from 'express';

import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
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
    returnErrorMissingField(request.body, ['email', 'password', 'name']);
    const { email, password, name } = request.body;

    const signUp = await this.signUpService.execute({ email, name, password });

    return response.json(signUp);
  }

  async signIn(request: Request, response: Response) {
    returnErrorMissingField(request.body, ['email', 'password']);

    const { email, password } = request.body;

    const signIn = await this.signInService.execute(email, password);

    return response.json(signIn);
  }
}

export default AuthController;
