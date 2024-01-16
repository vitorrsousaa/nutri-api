import RecoverUserController from '../../../app/modules/User/controllers/RecoverUser';
import { makeServiceRecoverUser } from '../services/makeServiceRecoverUser';

export function makeControllerRecoverUser() {
  return new RecoverUserController(makeServiceRecoverUser());
}
