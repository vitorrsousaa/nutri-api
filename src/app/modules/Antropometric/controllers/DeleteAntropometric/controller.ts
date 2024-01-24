import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import { DataBaseIdSchema } from '../../../../shared/entities/TUuid';
import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import { IDeleteAntropometricService } from '../../services/DeleteAntropometric';

export class DeleteAntropometricController implements IController {
  constructor(
    private readonly deleteAntropometricService: IDeleteAntropometricService
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

    const result = returnErrorMissingField(DataBaseIdSchema, request.body);

    const serviceInput = {
      patientId: request.patientId,
      antropometricId: result.id,
    };

    try {
      await this.deleteAntropometricService.execute(serviceInput);
      return {
        statusCode: 201,
        body: null,
      };
    } catch {
      return {
        statusCode: 400,
        body: {
          error: 'Patient not found',
        },
      };
    }
  }
}
