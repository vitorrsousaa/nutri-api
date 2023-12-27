import PatientRepositories from '../../../../shared/database/repositories/patient';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';

export class DeleteService {
  constructor(
    private readonly patientRepositories: PatientRepositories,
    private readonly validatePatientOwnershipService: ValidatePatientOwnershipService
  ) {}

  async execute(userId: string, patientId: string) {
    await this.validatePatientOwnershipService.validate(userId, patientId);

    await this.patientRepositories.delete({
      where: {
        id: patientId,
      },
    });

    return null;
  }
}
