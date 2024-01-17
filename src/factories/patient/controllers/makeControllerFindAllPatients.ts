import FindAllPatientsController from '../../../app/modules/Patient/controllers/FindAllPatients';
import { makeServiceFindAllPatients } from '../services/makeServiceFindAllPatients';

export function makeControllerFindAllPatients() {
  return new FindAllPatientsController(makeServiceFindAllPatients());
}
