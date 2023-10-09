import AppError from '../../../../shared/error';
import { createPatientDTO } from '../../dtos';
import PatientRepositories from '../../repositories/patient/PatientRepositories';

export class CreatePatientService {
  constructor(private readonly patientRepositories: PatientRepositories) {}

  async execute(createPatientDTO: createPatientDTO, userId: string) {
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
      ...newPatient,
    };
  }
}
