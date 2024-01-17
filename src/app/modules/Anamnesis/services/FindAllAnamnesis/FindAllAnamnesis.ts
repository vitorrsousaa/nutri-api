import * as z from 'zod';

import AnamnesisRepositories from '../../../../shared/database/repositories/anamnesis';

export const AnamnesisSchema = z.object({
  title: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  patientId: z.string(),
});

export type TAnamnesis = z.infer<typeof AnamnesisSchema>;

export interface IFindAllAnamnesisService {
  execute(
    findAllAnamenesisServiceInput: IFindAllAnamnesisServiceInput
  ): Promise<IFindAllAnamenesisServiceOutput>;
}

export interface IFindAllAnamnesisServiceInput {
  patientId: string;
}

export type IFindAllAnamenesisServiceOutput = TAnamnesis[];

export class FindAllAnamnesisService implements IFindAllAnamnesisService {
  constructor(private readonly anamnesisRepositories: AnamnesisRepositories) {}

  async execute(
    findAllAnamenesisServiceInput: IFindAllAnamnesisServiceInput
  ): Promise<IFindAllAnamenesisServiceOutput> {
    const { patientId } = findAllAnamenesisServiceInput;

    return this.anamnesisRepositories.findAll({
      where: {
        patientId: patientId,
      },
    });
  }
}
