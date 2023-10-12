import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { AppError, ZodError } from '../../error';

export default (
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.log(error);
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  if (error instanceof ZodError) {
    return response
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
