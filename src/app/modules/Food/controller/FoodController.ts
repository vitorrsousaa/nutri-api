import { Request, Response } from 'express';

import { OriginFoodEnum } from '../../../shared/entities/TOriginFood';
import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import FindAllFoodService from '../services/FindAll';

export class FoodController {
  constructor(private readonly findAllFoodService: FindAllFoodService) {}

  findAll = async (request: Request, response: Response) => {
    const { origin } = request.params;

    const result = returnErrorMissingField(OriginFoodEnum, origin);

    if (result === 'DATABASE') {
      const findAll = await this.findAllFoodService.execute();

      return response.json(findAll);
    }

    return response.json('API');
  };
}
