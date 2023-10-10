import { NextFunction, Request, request, Response } from 'express';

import AppError from '../../error';
import token from '../../providers/token';

interface PayloadProps {
  id: string;
}

export default function authHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Authentication is necessary');
  }

  const parts = authHeader.split(' ');

  if (!(parts.length === 2)) {
    throw new AppError('Authentication is necessary');
  }

  const [scheme, tokenJWT] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new AppError('Authentication is necessary');
  }

  try {
    const payload = token.verify(tokenJWT) as PayloadProps;

    request.user = { id: payload.id };

    next();
  } catch (error) {
    throw new AppError('Is not authorized', 401);
  }
}
