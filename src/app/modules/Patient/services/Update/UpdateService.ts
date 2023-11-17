import PatientRepositories from '../../../../shared/database/repositories/patient';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';
import ValidatePatientStatusService from '../../../../shared/services/ValidatePatientStatus';
import { IUpdatePatientDTO } from '../../dtos/update-patient-dto';

export class UpdateService {
  constructor(
    private readonly patientRepositories: PatientRepositories,
    private readonly validatePatientOwnershipService: ValidatePatientOwnershipService,
    private readonly validatePatientStatusService: ValidatePatientStatusService
  ) {}

  async execute(patient: IUpdatePatientDTO, userId: string, patientId: string) {
    const { email, birthDate, gender, height, weight } = patient;

    await this.validatePatient(userId, patientId);

    return this.patientRepositories.update({
      where: {
        id: patientId,
      },
      data: {
        birthDate,
        gender,
        height,
        weight,
        email,
      },
    });
  }

  private async validatePatient(userId: string, patientId: string) {
    return Promise.all([
      this.validatePatientOwnershipService.validate(userId, patientId),
      this.validatePatientStatusService.validate(userId, patientId),
    ]);
  }
}
