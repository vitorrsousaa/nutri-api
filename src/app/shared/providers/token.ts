import jwt from 'jsonwebtoken';

import authConfig from '../config/auth.json';
import { ACCESS_TOKEN_EXPIRATION } from '../constants/auth';

export type IGenerateToken = {
  id: string;
};

export interface IToken {
  generate: ({ id }: IGenerateToken, duration?: number) => string;
  verify: (token: string) => string | jwt.JwtPayload;
}

class TokenClass implements IToken {
  generate(generateToken: IGenerateToken, duration?: number) {
    const { id } = generateToken;
    const time = duration ? duration : ACCESS_TOKEN_EXPIRATION;

    return jwt.sign({ id: id.toString() }, authConfig.secret, {
      expiresIn: time,
    });
  }

  verify(token: string) {
    return jwt.verify(token, authConfig.secret);
  }
}

const Token = new TokenClass();

export default Token;
