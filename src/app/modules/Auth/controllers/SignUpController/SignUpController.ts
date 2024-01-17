import {
  IController,
  IRequest,
  IResponse,
} from '@godiet-interfaces/controller';

import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import { CreateUserSchema } from '../../dtos/create-user-dto';
import { ISignUpService } from '../../services/SignUp';

export class SignUpController implements IController {
  constructor(private readonly signUpService: ISignUpService) {}
  async handle(request: IRequest): Promise<IResponse> {
    const user = returnErrorMissingField(CreateUserSchema, request.body);

    const { email, password, name } = user;

    const result = await this.signUpService.execute({ email, name, password });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
