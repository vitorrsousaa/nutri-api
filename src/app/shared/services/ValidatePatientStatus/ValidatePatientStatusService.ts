/* eslint-disable indent */
import PatientRepositories from '../../database/repositories/patient';
import { AppError } from '../../error';

export interface IValidatePatientStatusService {
  validate(userId: string, patientId: string): Promise<void>;
}

export class ValidatePatientStatusService
  implements IValidatePatientStatusService
{
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

    if (isPatientOwnedByUser?.status === 'INACTIVE') {
      throw new AppError('Patient not found', 404);
    }
  }
}
