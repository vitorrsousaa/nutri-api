import { Request, Response } from 'express';

import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import SignUp from '../services/SignUp';

class AuthController {
  constructor(private readonly signUpService: SignUp) {
    this.signUp = this.signUp.bind(this);
  }

  async signUp(request: Request, response: Response) {
    returnErrorMissingField(request.body, ['email', 'password', 'name']);
    const { email, password, name } = request.body;

    const signUp = await this.signUpService.execute({ email, name, password });

    return response.json(signUp);
  }
}

export default AuthController;
