import RecoverUserService from '../../../app/modules/User/services/Recover';
import { makeUserRepositories } from '../../repositories/makeUserRepositories';

export function makeServiceRecoverUser() {
  return new RecoverUserService(makeUserRepositories());
}
