import { AuthenticationMiddleware } from '@godiet-middlewares/AuthenticationMiddleware';

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware();
}
