import PatientRepositories from '../../../../shared/database/repositories/patient';
import { AppError } from '../../../../shared/error';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';
import ValidatePatientStatusService from '../../../../shared/services/ValidatePatientStatus';
import { IUpdatePatientDTO } from '../../dtos/update-patient-dto';
import { TPatient } from '../../entities/TPatient';

interface IUpdatePatientServiceOutput {
  patient: TPatient;
}

interface IUpdatePatientServiceInput {
  patient: IUpdatePatientDTO;
  userId: string;
  patientId: string;
}

interface IValidatePatientServiceInput {
  patientId: string;
  userId: string;
  patientEmail: string;
}

export interface IUpdateService {
  execute(
    updateServiceInput: IUpdatePatientServiceInput
  ): Promise<IUpdatePatientServiceOutput>;
}

export class UpdateService implements IUpdateService {
  constructor(
    private readonly patientRepositories: PatientRepositories,
    private readonly validatePatientOwnershipService: ValidatePatientOwnershipService,
    private readonly validatePatientStatusService: ValidatePatientStatusService
  ) {}

  async execute(
    updateServiceInput: IUpdatePatientServiceInput
  ): Promise<IUpdatePatientServiceOutput> {
    const { patient, userId, patientId } = updateServiceInput;
    const { email, birthDate, gender, height, weight } = patient;

    await this.validatePatient({
      userId,
      patientId,
      patientEmail: patient.email,
    });

    const updatePatient = await this.patientRepositories.update({
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

    return {
      patient: updatePatient,
    };
  }

  private async validatePatient(
    validatePatientInput: IValidatePatientServiceInput
  ) {
    const { userId, patientId, patientEmail } = validatePatientInput;
    return Promise.all([
      this.validatePatientOwnershipService.validate(userId, patientId),
      this.validatePatientStatusService.validate(userId, patientId),
      this.validateHasPatientWithEmail(patientEmail, patientId),
    ]);
  }

  private async validateHasPatientWithEmail(email: string, id: string) {
    const patient = await this.patientRepositories.findFirst({
      where: {
        email,
      },
    });

    if (patient && patient.id !== id) {
      console.log('aqui dentro');
      throw new AppError('Patient already exists');
    }
  }
}
