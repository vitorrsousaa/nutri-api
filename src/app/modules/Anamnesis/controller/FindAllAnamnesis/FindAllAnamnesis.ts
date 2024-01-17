import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';
import { IFindAllAnamnesisService } from '../../services/FindAllAnamnesis';

export class FindAllAnamnesisController implements IController {
  constructor(
    private readonly findAllAnamnesisService: IFindAllAnamnesisService
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    if (!request.patientId) {
      return {
        statusCode: 400,
        body: {
          error: 'Patient not found',
        },
      };
    }

    const result = await this.findAllAnamnesisService.execute({
      patientId: request.patientId,
    });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
