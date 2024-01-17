import SignUpService from '../../../app/modules/Auth/services/SignUp';
import { makeCryptProvider } from '../../providers/makeCryptProvider';
import { makeTokenProvider } from '../../providers/makeTokenProvider';
import { makeRepositoryUser } from '../../repositories/makeRepositoryUser';

export function makeServiceSignUp() {
  return new SignUpService(
    makeRepositoryUser(),
    makeCryptProvider(),
    makeTokenProvider()
  );
}
