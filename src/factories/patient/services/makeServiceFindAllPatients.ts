import FindAllPatientService from '../../../app/modules/Patient/services/FindAll';
import { makeRepositoryPatient } from '../../repositories/makeRepositoryPatient';

export function makeServiceFindAllPatients() {
  return new FindAllPatientService(makeRepositoryPatient());
}
