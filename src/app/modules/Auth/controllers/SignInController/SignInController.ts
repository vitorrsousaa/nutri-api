import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import { UserSchema } from '../../services/SignIn';
import { ISignInService } from '../../services/SignIn';

export class SignInController implements IController {
  constructor(private readonly signInService: ISignInService) {}
  async handle(request: IRequest): Promise<IResponse> {
    const user = returnErrorMissingField(UserSchema, request.body);

    const result = await this.signInService.execute({
      user: {
        email: user.email,
        password: user.password,
      },
    });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
