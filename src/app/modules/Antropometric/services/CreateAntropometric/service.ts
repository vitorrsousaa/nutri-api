import AntropometricRepositories from 'app/shared/database/repositories/antropometric';
import * as z from 'zod';

export const CreateAntropometricServiceSchema = z.object({
  patientId: z.string(),
  userId: z.string(),
  weight: z.number(),
  height: z.number(),
  date: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Date must be less than or equal to today',
    }),
});

export type TCreateAntropometric = z.infer<
  typeof CreateAntropometricServiceSchema
>;

export interface ICreateAntropometricService {
  execute(
    createAntropometricInput: ICreateAntropometricInput
  ): Promise<ICreateAntropometricOutput>;
}

export type ICreateAntropometricInput = TCreateAntropometric;

export interface ICreateAntropometricOutput {
  id: string;
  userId: string;
  patientId: string;
  createdAt: Date;
  updatedAt: Date;
  weight: number;
  height: number;
}

export class CreateAntropometricService implements ICreateAntropometricService {
  constructor(
    private readonly antropometricRepositories: AntropometricRepositories
  ) {}

  async execute(
    createAntropometricInput: ICreateAntropometricInput
  ): Promise<ICreateAntropometricOutput> {
    const { height, weight, patientId, userId, date } =
      createAntropometricInput;

    return this.antropometricRepositories.create({
      data: {
        height,
        weight,
        patientId,
        userId,
        createdAt: date,
      },
    });
  }
}
