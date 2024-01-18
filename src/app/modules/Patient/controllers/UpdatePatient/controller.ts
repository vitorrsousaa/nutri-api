import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import { UpdatePatientSchema } from '../../dtos/update-patient-dto';
import { IUpdatePatientService } from '../../services/Update';

export class UpdatePatientController implements IController {
  constructor(private readonly updatePatientService: IUpdatePatientService) {}
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

    const updateDTO = returnErrorMissingField(
      UpdatePatientSchema,
      request.body
    );

    const updateResult = await this.updatePatientService.execute({
      userId: request.accountId,
      patientId: request.patientId,
      patient: updateDTO,
    });

    return {
      statusCode: 200,
      body: updateResult,
    };
  }
}
