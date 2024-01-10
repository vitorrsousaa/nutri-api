import jwt from 'jsonwebtoken';

import Config from '../../config';
import { ACCESS_TOKEN_EXPIRATION } from '../constants/auth';
import { IGenerateToken, IToken, PayloadProps } from '../interfaces/token';

class TokenProvider implements IToken {
  generate(generateToken: IGenerateToken, duration?: number) {
    const { id } = generateToken;
    const time = duration ? duration : ACCESS_TOKEN_EXPIRATION;

    return jwt.sign({ id: id.toString() }, Config.AUTH_SECRET, {
      expiresIn: time,
    });
  }

  verify(token: string) {
    const result = jwt.verify(token, Config.AUTH_SECRET);
    return result as PayloadProps;
  }
}

const Token = new TokenProvider();

export default Token;
