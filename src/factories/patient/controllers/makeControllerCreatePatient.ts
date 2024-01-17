import CreatePatientController from '../../../app/modules/Patient/controllers/CreatePatient';
import { makeServiceCreatePatient } from '../services/makeServiceCreatePatient';

export function makeControllerCreatePatient() {
  return new CreatePatientController(makeServiceCreatePatient());
}
