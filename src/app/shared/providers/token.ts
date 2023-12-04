import jwt from 'jsonwebtoken';

import Config from '../../config';
import { ACCESS_TOKEN_EXPIRATION } from '../constants/auth';
import { IGenerateToken, IToken } from '../interfaces/token';

class TokenProvider implements IToken {
  generate(generateToken: IGenerateToken, duration?: number) {
    const { id } = generateToken;
    const time = duration ? duration : ACCESS_TOKEN_EXPIRATION;

    return jwt.sign({ id: id.toString() }, Config.AUTH_SECRET, {
      expiresIn: time,
    });
  }

  verify(token: string) {
    return jwt.verify(token, Config.AUTH_SECRET);
  }
}

const Token = new TokenProvider();

export default Token;
