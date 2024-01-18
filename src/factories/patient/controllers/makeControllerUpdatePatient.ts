import UpdatePatientController from '../../../app/modules/Patient/controllers/UpdatePatient';
import { makeServiceUpdatePatient } from '../services/makeServiceUpdatePatient';

export function makeControllerUpdatePatient() {
  return new UpdatePatientController(makeServiceUpdatePatient());
}
