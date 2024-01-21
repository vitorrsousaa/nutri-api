/* eslint-disable indent */
import AntropometricRepositories from 'app/shared/database/repositories/antropometric';
import * as z from 'zod';

export const AntropometricSchema = z.object({
  id: z.string(),
  userId: z.string(),
  patientId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  weight: z.number(),
  height: z.number(),
});

export type TAntropometric = z.infer<typeof AntropometricSchema>;

export interface IFindAllAntropometricService {
  execute(
    findAllAntropometricInput: IFindAllAntropometricInput
  ): Promise<IFindAllAntropometricOutput>;
}

export interface IFindAllAntropometricInput {
  patientId: string;
}

export type IFindAllAntropometricOutput = TAntropometric[];

export class FindAllAntropometricService
  implements IFindAllAntropometricService
{
  constructor(
    private readonly antropometricRepositories: AntropometricRepositories
  ) {}

  async execute(
    findAllAntropometricInput: IFindAllAntropometricInput
  ): Promise<IFindAllAntropometricOutput> {
    const { patientId } = findAllAntropometricInput;

    return this.antropometricRepositories.findAll({
      where: {
        patientId: patientId,
      },
    });
  }
}
