import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
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
    if (!request.accountId) {
      return {
        statusCode: 400,
        body: {
          error: 'Anamnesis not found',
        },
      };
    }

    if (!request.patientId) {
      return {
        statusCode: 400,
        body: {
          error: 'Patient not found',
        },
      };
    }

    const anamnesisParsed = returnErrorMissingField(
      CreateAnamnesisSchema,
      request.body
    );

    const result = await this.createAnamnesisService.execute({
      userId: request.accountId,
      patientId: request.patientId,
      anamnesis: anamnesisParsed,
    });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
