import jwt from 'jsonwebtoken';

import authConfig from '../config/auth.json';
import { ACCESS_TOKEN_EXPIRATION } from '../constants/auth';

class Token {
  generate({ id }: { id: string }, duration?: number) {
    const time = duration ? duration : ACCESS_TOKEN_EXPIRATION;

    return jwt.sign({ id: id.toString() }, authConfig.secret, {
      expiresIn: time,
    });
  }

  verify(token: string) {
    return jwt.verify(token, authConfig.secret);
  }
}

export default new Token();
