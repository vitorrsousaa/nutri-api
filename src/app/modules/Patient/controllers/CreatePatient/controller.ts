import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import { CreatePatientSchema } from '../../dtos/create-patient-dto';
import { ICreatePatientService } from '../../services/Create';

export class CreatePatientController implements IController {
  constructor(private readonly createPatientService: ICreatePatientService) {}
  async handle(request: IRequest): Promise<IResponse> {
    const result = returnErrorMissingField(CreatePatientSchema, request.body);

    const { birthDate, email, gender, height, name, weight } = result;

    if (!request.accountId) {
      return {
        statusCode: 400,
        body: {
          error: 'User not found',
        },
      };
    }

    const create = await this.createPatientService.execute({
      createPatientDTO: { birthDate, email, gender, height, name, weight },
      userId: request.accountId,
    });

    return {
      statusCode: 200,
      body: create,
    };
  }
}
