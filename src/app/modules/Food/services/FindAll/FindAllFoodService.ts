import type { Prisma } from '@prisma/client';

import FoodRepositories from '../../../../shared/database/repositories/food';

type IFindAllFoodServiceInput = void;

type TFood = {
  id: string;
  name: string;
  baseQty: number;
  baseUnit: string;
  categoryName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: Record<string, any>[];
};

type TFoodDatabase = {
  id: string;
  name: string;
  baseQty: number;
  baseUnit: string;
  categoryName: string;
  attributes: Prisma.JsonValue[];
};

export interface IFindAllFoodService {
  execute(input: IFindAllFoodServiceInput): Promise<TFood[]>;
}

export class FindAllFoodService implements IFindAllFoodService {
  constructor(private readonly foodRepositories: FoodRepositories) {}

  async execute() {
    const foods = await this.foodRepositories.findAll({
      orderBy: {
        name: 'asc',
      },
    });

    return foods.map(this.mapperToDomain);
  }

  private mapperToDomain(foodDatabase: TFoodDatabase): TFood {
    return {
      id: foodDatabase.id,
      name: foodDatabase.name,
      baseQty: foodDatabase.baseQty,
      baseUnit: foodDatabase.baseUnit,
      categoryName: foodDatabase.categoryName,
      attributes: foodDatabase.attributes as Record<string, unknown>[],
    };
  }
}
