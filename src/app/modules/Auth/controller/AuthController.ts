import { Request, Response } from 'express';

import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import { CreateUserSchema } from '../dtos/create-user-dto';
import { ISignUpService } from '../services/SignUp';

class AuthController {
  constructor(private readonly signUpService: ISignUpService) {
    this.signUp = this.signUp.bind(this);
  }

  async signUp(request: Request, response: Response) {
    const result = returnErrorMissingField(CreateUserSchema, request.body);

    const { email, password, name } = result;

    const signUp = await this.signUpService.execute({ email, name, password });

    return response.json(signUp);
  }
}

export default AuthController;
