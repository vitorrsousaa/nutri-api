/* eslint-disable indent */
import AnamnesisTemplateRepositories from '../../../../shared/database/repositories/anamnesisTemplate';

export interface IFindAllAnamnesisTemplateByUserService {
  execute(
    findAllAnamnesisTemplateByUserInput: IFindAllAnamnesisTemplateByUserServiceInput
  ): Promise<IFindAllAnamnesisTemplateByUserServiceOutput>;
}

export type IFindAllAnamnesisTemplateByUserServiceOutput = AnamnesisTemplate[];

export interface IFindAllAnamnesisTemplateByUserServiceInput {
  userId: string;
}

type AnamnesisTemplate = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  title: string;
};

export class FindAllAnamnesisTemplateByUser
  implements IFindAllAnamnesisTemplateByUserService
{
  constructor(
    private readonly anamnesisTemplateRepositories: AnamnesisTemplateRepositories
  ) {}

  async execute(
    findAllAnamnesisTemplateByUserInput: IFindAllAnamnesisTemplateByUserServiceInput
  ): Promise<IFindAllAnamnesisTemplateByUserServiceOutput> {
    const { userId } = findAllAnamnesisTemplateByUserInput;
    return this.anamnesisTemplateRepositories.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
