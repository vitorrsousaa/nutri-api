import PatientRepositories from '../../../modules/Patient/repositories/patient/PatientRepositories';
import { AppError } from '../../error';

export class ValidatePatientOwnershipService {
  constructor(private readonly patientRepositories: PatientRepositories) {}

  async validate(userId: string, patientId: string) {
    const isPatientOwnedByUser = await this.patientRepositories.findFirst({
      where: {
        id: patientId,
        userId,
      },
    });

    if (!isPatientOwnedByUser) {
      throw new AppError('Patient not found', 404);
    }
  }
}
