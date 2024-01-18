import FindByPatientIdController from '../../../app/modules/Patient/controllers/FindByPatientId';
import { makeServiceFindByPatientId } from '../services/makeServiceFindByPatientId';

export function makeControllerFindByPatientId() {
  return new FindByPatientIdController(makeServiceFindByPatientId());
}
