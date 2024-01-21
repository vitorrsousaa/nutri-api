import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import { IFindAllAntropometricService } from '../../services/FindAllAntropometric';

export class FindAllController implements IController {
  constructor(
    private readonly findAllAntropometricService: IFindAllAntropometricService
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

    const antropometric = await this.findAllAntropometricService.execute({
      patientId: request.patientId,
    });

    return {
      statusCode: 200,
      body: antropometric,
    };
  }
}
