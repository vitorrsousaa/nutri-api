import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import { IFindAllPatientService } from '../../services/FindAll';

export class FindAllPatientsController implements IController {
  constructor(
    private readonly findAllPatientsService: IFindAllPatientService
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

    const findAllPatients = await this.findAllPatientsService.execute({
      userId: request.accountId,
    });

    return {
      statusCode: 200,
      body: findAllPatients,
    };
  }
}
