import * as z from 'zod';

import AnamnesisRepositories from '../../../../shared/database/repositories/anamnesis';

export interface IUpdateAnamnesisService {
  execute(
    updateAnamnesisServiceInput: IUpdateAnamnesisServiceInput
  ): Promise<IUpdateAnamnesisServiceOutput>;
}

export const UpdateAnamnesisSchema = z.object({
  title: z.string(),
  text: z.string(),
  id: z.string(),
});

export type TAnamnesisUpdateDTO = z.infer<typeof UpdateAnamnesisSchema>;

export interface IUpdateAnamnesisServiceInput {
  anamnesis: TAnamnesisUpdateDTO;
}

export interface IUpdateAnamnesisServiceOutput {}

export default class UpdateAnamnesisService implements IUpdateAnamnesisService {
  constructor(private readonly anamnesisRepositories: AnamnesisRepositories) {}

  async execute(
    updateAnamnesisServiceInput: IUpdateAnamnesisServiceInput
  ): Promise<IUpdateAnamnesisServiceOutput> {
    const { anamnesis } = updateAnamnesisServiceInput;

    return await this.anamnesisRepositories.update({
      where: {
        id: anamnesis.id,
      },
      data: {
        title: anamnesis.title,
        text: anamnesis.text,
      },
    });
  }
}
