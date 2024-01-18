import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import { IFindByPatientIdService } from '../../services/FindByUserId';

export class FindByPatientIdController implements IController {
  constructor(
    private readonly findByPatientIdService: IFindByPatientIdService
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

    const findByPatientId = await this.findByPatientIdService.execute({
      userId: request.accountId,
      patientId: request.patientId,
    });

    return {
      statusCode: 200,
      body: findByPatientId,
    };
  }
}
