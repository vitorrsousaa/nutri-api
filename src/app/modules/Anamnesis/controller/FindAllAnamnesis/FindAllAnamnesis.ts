import {
  IController,
  IRequest,
  IResponse,
} from '@godiet-interfaces/controller';

import { DataBaseIdSchema } from '../../../../shared/entities/TUuid';
import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import { IFindAllAnamnesisService } from '../../services/FindAllAnamnesis';

export class FindAllAnamnesisController implements IController {
  constructor(
    private readonly findAllAnamnesisService: IFindAllAnamnesisService
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    const user = returnErrorMissingField(DataBaseIdSchema, {
      id: request.accountId,
    });

    const patient = returnErrorMissingField(DataBaseIdSchema, {
      id: request.params.patientId,
    });

    const result = await this.findAllAnamnesisService.execute({
      userId: user.id,
      patientId: patient.id,
    });

    return {
      statusCode: 200,

      body: result,
    };
  }
}
