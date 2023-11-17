import { Request, Response } from 'express';

import { OriginFoodEnum } from '../../../shared/entities/TOriginFood';
import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import FindAllFoodService from '../services/FindAll';

export class FoodController {
  constructor(private readonly findAllFoodService: FindAllFoodService) {}

  findAll = async (request: Request, response: Response) => {
    const { origin } = request.params;

    const result = returnErrorMissingField(OriginFoodEnum, origin);

    if (result === 'TACO') {
      const findAll = await this.findAllFoodService.execute();

      return response.json(findAll);
    }

    return response.json([
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
    ]);
  };
}
