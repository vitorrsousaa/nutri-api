import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import { IDeleteService } from '../../services/Delete';

export class DeletePatientController implements IController {
  constructor(private readonly deletePatientService: IDeleteService) {}
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

    await this.deletePatientService.execute({
      userId: request.accountId,
      patientId: request.patientId,
    });

    return {
      statusCode: 204,
      body: null,
    };
  }
}
