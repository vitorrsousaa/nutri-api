import DeletePatientController from '../../../app/modules/Patient/controllers/DeletePatient';
import { makeServiceDeletePatient } from '../services/makeServiceDeletePatient';

export function makeControllerDeletePatient() {
  return new DeletePatientController(makeServiceDeletePatient());
}
