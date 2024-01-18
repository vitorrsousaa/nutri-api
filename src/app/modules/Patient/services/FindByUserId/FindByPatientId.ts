import PatientRepositories from '../../../../shared/database/repositories/patient';
import { TPatient } from '../../entities/TPatient';

export interface IFindByPatientIdServiceInput {
  userId: string;
  patientId: string;
}

export type IFindByPatientIdServiceOutput = TPatient | null;

export interface IFindByPatientIdService {
  execute(
    input: IFindByPatientIdServiceInput
  ): Promise<IFindByPatientIdServiceOutput>;
}

export class FindByPatientId implements IFindByPatientIdService {
  constructor(private readonly patientRepositories: PatientRepositories) {}

  async execute(
    findByPatientIdServiceInput: IFindByPatientIdServiceInput
  ): Promise<IFindByPatientIdServiceOutput> {
    const { userId, patientId } = findByPatientIdServiceInput;

    const patient = await this.patientRepositories.findUnique({
      where: {
        id: patientId,
        userId: userId,
      },
      include: {
        planningMeal: {
          include: {
            meals: {
              include: {
                mealFoods: true,
              },
            },
          },
        },
      },
    });

    return patient;
  }
}
