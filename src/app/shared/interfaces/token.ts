import jwt from 'jsonwebtoken';

export type IGenerateToken = {
  id: string;
};

export interface IToken {
  generate: ({ id }: IGenerateToken, duration?: number) => string;
  verify: (token: string) => string | jwt.JwtPayload;
}
