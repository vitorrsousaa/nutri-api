import PatientRepositories from '../../../../shared/database/repositories/patient';
import { TPatient } from '../../entities/TPatient';

export interface IFindAllPatientServiceInput {
  userId: string;
}

export type IFindAllPatientServiceOutput = TPatient[];

export interface IFindAllPatientService {
  execute(
    data: IFindAllPatientServiceInput
  ): Promise<IFindAllPatientServiceOutput>;
}

export class FindAllPatientService implements IFindAllPatientService {
  constructor(private readonly patientRepositories: PatientRepositories) {}

  async execute(
    findAllServiceInput: IFindAllPatientServiceInput
  ): Promise<IFindAllPatientServiceOutput> {
    const { userId } = findAllServiceInput;
    const findPatient = await this.patientRepositories.findAll({
      where: {
        userId,
      },
    });

    return findPatient;
  }
}
