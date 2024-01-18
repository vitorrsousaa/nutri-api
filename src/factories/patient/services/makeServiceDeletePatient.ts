import DeletePatientService from '../../../app/modules/Patient/services/Delete';
import { makeRepositoryPatient } from '../../repositories/makeRepositoryPatient';

export function makeServiceDeletePatient() {
  return new DeletePatientService(makeRepositoryPatient());
}
