import { AuthorizationPatient } from '../../app/middlewares/AuthorizationPatient';
import { makeRepositoryPatient } from '../repositories/makeRepositoryPatient';

export function makeMiddlewareAuthorizationPatientModification() {
  return new AuthorizationPatient(makeRepositoryPatient());
}
