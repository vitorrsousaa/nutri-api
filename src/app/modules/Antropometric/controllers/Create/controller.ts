import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import { ICreateAntropometricService } from '../../services/CreateAntropometric';
import { CreateAntropometricServiceSchema } from '../../services/CreateAntropometric/service';

export class CreateController implements IController {
  constructor(
    private readonly createAntropometricService: ICreateAntropometricService
  ) {}
  async handle(request: IRequest): Promise<IResponse> {
    if (!request.accountId) {
      return {
        statusCode: 400,
        body: {
          error: 'User not found',
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

    const serviceInput = returnErrorMissingField(
      CreateAntropometricServiceSchema,
      {
        patientId: request.patientId,
        userId: request.accountId,
        ...request.body,
      }
    );

    const result = await this.createAntropometricService.execute(serviceInput);

    return {
      statusCode: 200,
      body: result,
    };
  }
}
