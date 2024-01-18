import {
  IData,
  IMiddleware,
  IRequest,
  IResponse,
} from '../interfaces/middleware';
import PatientRepositories from '../shared/database/repositories/patient';
import { DataBaseIdSchema } from '../shared/entities/TUuid';
import returnErrorMissingField from '../shared/utils/returnErrorMissingField';

export class AuthorizationPatient implements IMiddleware {
  constructor(private readonly patientRepositories: PatientRepositories) {}

  async handle(request: IRequest): Promise<IResponse | IData> {
    const patient = returnErrorMissingField(DataBaseIdSchema, {
      id: request.params.patientId,
    });

    const isPatientOwnedByUser = await this.patientRepositories.findFirst({
      where: {
        id: patient.id,
        userId: request.accountId,
      },
    });

    if (!isPatientOwnedByUser) {
      return {
        statusCode: 401,
        body: {
          error: 'Patient not found',
        },
      };
    }

    return {
      data: {
        patientId: isPatientOwnedByUser.id,
      },
    };
  }
}
