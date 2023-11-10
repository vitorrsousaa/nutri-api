import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';
import PatientRepositories from '../../repositories/patient/PatientRepositories';

export class FindByPatientId {
  constructor(
    private readonly patientRepositories: PatientRepositories,
    private readonly validatePatientOwnershipService: ValidatePatientOwnershipService
  ) {}

  async execute(userId: string, patientId: string) {
    await this.validatePatientOwnershipService.validate(userId, patientId);

    const patient = await this.patientRepositories.findUnique({
      where: {
        id: patientId,
        userId: userId,
      },
    });

    return patient;
  }
}
