import PatientRepositories from '../../../../shared/database/repositories/patient';

export interface IDeleteServiceInput {
  userId: string;
  patientId: string;
}

export type IDeleteServiceOutput = null;

export type IDeleteService = {
  execute(input: IDeleteServiceInput): Promise<IDeleteServiceOutput>;
};

export class DeleteService implements IDeleteService {
  constructor(private readonly patientRepositories: PatientRepositories) {}

  async execute({ userId, patientId }: IDeleteServiceInput) {
    await this.patientRepositories.delete({
      where: {
        id: patientId,
        userId,
      },
    });

    return null;
  }
}
