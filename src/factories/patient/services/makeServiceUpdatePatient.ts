import UpdatePatientService from '../../../app/modules/Patient/services/Update';
import { makeRepositoryPatient } from '../../repositories/makeRepositoryPatient';

export function makeServiceUpdatePatient() {
  return new UpdatePatientService(makeRepositoryPatient());
}
