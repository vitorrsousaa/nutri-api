import PatientRepositories from '../../repositories/patient/PatientRepositories';

export class FindAllPatientService {
  constructor(private readonly patientRepositories: PatientRepositories) {}

  async execute(userId: string) {
    const findPatient = await this.patientRepositories.findAll({
      where: {
        userId,
      },
    });

    return findPatient;
  }
}
