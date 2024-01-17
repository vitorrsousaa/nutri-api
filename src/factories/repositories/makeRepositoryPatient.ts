import prisma from '../../app/shared/database/prisma';
import PatientRepositories from '../../app/shared/database/repositories/patient';

export function makeRepositoryPatient() {
  return new PatientRepositories(prisma);
}
