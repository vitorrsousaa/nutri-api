/* eslint-disable indent */
import PatientRepositories from '../../database/repositories/patient';
import { AppError } from '../../error';
export interface IValidatePatientOwnershipService {
  validate(userId: string, patientId: string): Promise<void>;
}

export class ValidatePatientOwnershipService
  implements IValidatePatientOwnershipService
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
  }
}
