import PatientRepositories from '../../database/repositories/patient';
import { AppError } from '../../error';

export class ValidatePatientStatusService {
  constructor(private readonly patientRepositories: PatientRepositories) {}

  async validate(userId: string, patientId: string) {
    const isPatientOwnedByUser = await this.patientRepositories.findFirst({
      where: {
        id: patientId,
        userId,
      },
    });

    if (isPatientOwnedByUser?.status === 'INACTIVE') {
      throw new AppError('Patient not found', 404);
    }
  }
}
