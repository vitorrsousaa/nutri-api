import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import {
  IUpdateAnamnesisService,
  UpdateAnamnesisSchema,
} from '../../services/UpdateAnamnesis';

export class UpdateAnamnesisController implements IController {
  constructor(
    private readonly updateAnamnesisService: IUpdateAnamnesisService
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    const anamnesisParsed = returnErrorMissingField(
      UpdateAnamnesisSchema,
      request.body
    );

    if (!request.patientId) {
      return {
        statusCode: 400,
        body: {
          error: 'Patient not found',
        },
      };
    }

    if (!request.accountId) {
      return {
        statusCode: 400,
        body: {
          error: 'User not found',
        },
      };
    }

    const result = await this.updateAnamnesisService.execute({
      anamnesis: anamnesisParsed,
    });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
