import FindByPatientId from '../../../app/modules/Patient/services/FindByUserId';
import { makeRepositoryPatient } from '../../repositories/makeRepositoryPatient';

export function makeServiceFindByPatientId() {
  return new FindByPatientId(makeRepositoryPatient());
}
