import SignInController from '../../../app/modules/Auth/controllers/SignInController';
import { makeServiceSignIn } from '../services/makeServiceSignIn';

export function makeControllerSignIn() {
  return new SignInController(makeServiceSignIn());
}
