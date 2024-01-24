import AntropometricRepositories from 'app/shared/database/repositories/antropometric';

export interface IDeleteAntropometricService {
  execute(
    deleteAntropometricInput: IDeleteAntropometricInput
  ): Promise<IDeleteAntropometricOutput>;
}

export interface IDeleteAntropometricInput {
  patientId: string;

  antropometricId: string;
}

export type IDeleteAntropometricOutput = null;

export class DeleteAntropometricService implements IDeleteAntropometricService {
  constructor(
    private readonly antropometricRepositories: AntropometricRepositories
  ) {}

  async execute(
    deleteAntropometricInput: IDeleteAntropometricInput
  ): Promise<IDeleteAntropometricOutput> {
    await this.antropometricRepositories.delete({
      where: {
        id: deleteAntropometricInput.antropometricId,
        patientId: deleteAntropometricInput.patientId,
      },
    });

    return null;
  }
}
