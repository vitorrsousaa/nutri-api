import RecoverUserService from '../../../app/modules/User/services/Recover';
import { makeRepositoryUser } from '../../repositories/makeRepositoryUser';

export function makeServiceRecoverUser() {
  return new RecoverUserService(makeRepositoryUser());
}
