import { Request, Response } from 'express';

import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import { GroupFoodSchema } from '../entities/group';
import FindAllFoodService from '../services/FindAll';
import FindAllByGroupFoodService from '../services/FindAllByGroup';

export class FoodController {
  constructor(
    private readonly findAllFoodService: FindAllFoodService,
    private readonly findAllByGroupService: FindAllByGroupFoodService
  ) {}

  findAll = async (request: Request, response: Response) => {
    const findAll = await this.findAllFoodService.execute();

    return response.json(findAll);
  };

  findAllByGroup = async (request: Request, response: Response) => {
    const { params } = request;

    const group = returnErrorMissingField(GroupFoodSchema, params.group);

    const findAll = await this.findAllByGroupService.execute(group);

    return response.json(findAll);
  };
}
