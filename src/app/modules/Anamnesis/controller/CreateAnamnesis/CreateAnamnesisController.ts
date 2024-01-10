import {
  IController,
  IRequest,
  IResponse,
} from '@godiet-interfaces/controller';

import { DataBaseIdSchema } from '../../../../shared/entities/TUuid';
import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import {
  CreateAnamnesisSchema,
  ICreateAnamnesisService,
} from '../../services/CreateAnamnesis';

export class CreateAnamnesisController implements IController {
  constructor(
    private readonly createAnamnesisService: ICreateAnamnesisService
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    const user = returnErrorMissingField(DataBaseIdSchema, {
      id: request.accountId,
    });

    const patient = returnErrorMissingField(DataBaseIdSchema, {
      id: request.params.patientId,
    });

    const anamnesisParsed = returnErrorMissingField(
      CreateAnamnesisSchema,
      request.body
    );

    const result = await this.createAnamnesisService.execute({
      userId: user.id,
      patientId: patient.id,
      anamnesis: anamnesisParsed,
    });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
