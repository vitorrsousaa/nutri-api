import PatientRepositories from '../../../../shared/database/repositories/patient';
import { AppError } from '../../../../shared/error';
import { ICreatePatientDTO } from '../../dtos/create-patient-dto';
import { TPatient } from '../../entities/TPatient';

export interface ICreatePatientServiceOutput {
  patient: TPatient;
}

export interface ICreatePatientServiceInput {
  createPatientDTO: ICreatePatientDTO;
  userId: string;
}

export interface ICreatePatientService {
  execute(
    createPatientInput: ICreatePatientServiceInput
  ): Promise<ICreatePatientServiceOutput>;
}

export class CreatePatientService implements ICreatePatientService {
  constructor(private readonly patientRepositories: PatientRepositories) {}

  async execute(
    createPatientInput: ICreatePatientServiceInput
  ): Promise<ICreatePatientServiceOutput> {
    const { createPatientDTO, userId } = createPatientInput;
    const { birthDate, email, gender, height, name, weight } = createPatientDTO;

    const findPatient = await this.patientRepositories.findByEmail(email);

    if (findPatient) {
      throw new AppError('Email already in use', 404);
    }

    const newPatient = await this.patientRepositories.create({
      data: {
        birthDate,
        email,
        height,
        name,
        weight,
        gender,
        userId,
      },
    });

    return {
      patient: newPatient,
    };
  }
}
