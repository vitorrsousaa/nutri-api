import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import { DataBaseIdSchema } from '../../../../shared/entities/TUuid';
import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import { IRecoverUserService } from '../../services/Recover';

export class RecoverUserController implements IController {
  constructor(private readonly recoverUserService: IRecoverUserService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const user = returnErrorMissingField(DataBaseIdSchema, {
      id: request.accountId,
    });

    const recover = await this.recoverUserService.execute({
      userId: user.id,
    });

    return {
      statusCode: 200,
      body: recover,
    };
  }
}
