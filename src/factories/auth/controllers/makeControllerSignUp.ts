import SignUpController from '../../../app/modules/Auth/controllers/SignUpController';
import { makeServiceSignUp } from '../services/makeServiceSignUp';

export function makeControllerSignUp() {
  return new SignUpController(makeServiceSignUp());
}
