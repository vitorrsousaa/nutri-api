import {
  IController,
  IRequest,
  IResponse,
} from '@godiet-interfaces/controller';

import { DataBaseIdSchema } from '../../../../shared/entities/TUuid';
import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import { IFindAllAnamnesisTemplateByUserService } from '../../services/FindAllByUser';

export class FindAllAnamnesisTemplateByUserController implements IController {
  constructor(
    private readonly findAllAnamnesisTemplateByUserService: IFindAllAnamnesisTemplateByUserService
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    const user = returnErrorMissingField(DataBaseIdSchema, {
      id: request.accountId,
    });

    const result = await this.findAllAnamnesisTemplateByUserService.execute({
      userId: user.id,
    });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
