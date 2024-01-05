import {
  IController,
  IRequest,
  IResponse,
} from '@godiet-interfaces/controller';

import { OriginFoodEnum } from '../../../../shared/entities/TOriginFood';
import returnErrorMissingField from '../../../../shared/utils/returnErrorMissingField';
import FindAllFoodService from '../../services/FindAll';

export class FindAllFoodController implements IController {
  constructor(private readonly findAllFoodService: FindAllFoodService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { origin } = request.params;

    const result = returnErrorMissingField(OriginFoodEnum, origin);

    if (result === 'TACO') {
      const findAll = await this.findAllFoodService.execute();

      return {
        statusCode: 200,
        body: findAll,
      };
    }

    return {
      statusCode: 200,
      body: [
        {
          id: '41295d94-09b0-4ce3-b83d-2ad829f3b8f4',
          name: 'Abacaxi',
          calories: 45,
          protein: 0.8,
          fat: 0.1,
          quantity: 100,
          carb: 11.5,
          group: 'FRUIT',
        },
      ],
    };
  }
}
