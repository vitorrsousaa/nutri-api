import CreatePatientService from '../../../app/modules/Patient/services/Create';
import { makeRepositoryPatient } from '../../repositories/makeRepositoryPatient';

export function makeServiceCreatePatient() {
  return new CreatePatientService(makeRepositoryPatient());
}
