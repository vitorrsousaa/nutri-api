import SignInService from '../../../app/modules/Auth/services/SignIn';
import { makeTokenProvider } from '../../providers/makeTokenProvider';
import { makeRepositoryUser } from '../../repositories/makeRepositoryUser';

import { makeCryptProvider } from './../../providers/makeCryptProvider';

export function makeServiceSignIn() {
  return new SignInService(
    makeRepositoryUser(),
    makeCryptProvider(),
    makeTokenProvider()
  );
}
