import prisma from '../../../app/shared/database/prisma';
import PatientRepositories from '../../../app/shared/database/repositories/patient';
import ValidatePatientOwnershipService from '../../../app/shared/services/ValidatePatientOwnership';

export function makeValidatePatientOwnershipService() {
  return new ValidatePatientOwnershipService(new PatientRepositories(prisma));
}
