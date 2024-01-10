import * as z from 'zod';

import AnamnesisRepositories from '../../../../shared/database/repositories/anamnesis';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';

export interface ICreateAnamnesisService {
  execute(
    createAnamnesisServiceInput: ICreateAnamnesisServiceInput
  ): Promise<ICreateAnamnesisServiceOutput>;
}

export const CreateAnamnesisSchema = z.object({
  title: z.string(),
  text: z.string(),
});

export type TAnamnesisCreateDTO = z.infer<typeof CreateAnamnesisSchema>;

export interface ICreateAnamnesisServiceInput {
  userId: string;
  patientId: string;
  anamnesis: TAnamnesisCreateDTO;
}

export interface ICreateAnamnesisServiceOutput {}

export class CreateAnamnesisService implements ICreateAnamnesisService {
  constructor(
    private readonly validatePatientOwnershipService: ValidatePatientOwnershipService,
    private readonly anamnesisRepositories: AnamnesisRepositories
  ) {}

  async execute(
    createAnamnesisServiceInput: ICreateAnamnesisServiceInput
  ): Promise<ICreateAnamnesisServiceOutput> {
    const { patientId, userId, anamnesis } = createAnamnesisServiceInput;

    await this.validatePatientOwnershipService.validate(userId, patientId);

    return this.anamnesisRepositories.create({
      data: {
        title: anamnesis.title,
        text: anamnesis.text,
        patientId: patientId,
        userId: userId,
      },
    });
  }
}
