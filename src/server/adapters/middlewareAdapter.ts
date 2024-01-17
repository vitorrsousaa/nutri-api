import { NextFunction, Request, Response } from 'express';

import { IMiddleware } from '../../app/interfaces/middleware';

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const middlewareResponse = await middleware.handle({
      headers: request.headers as Record<string, string>,
      params: request.params as Record<string, string>,
      accountId: request.metadata.accountId,
    });

    if ('statusCode' in middlewareResponse) {
      const { statusCode, body } = middlewareResponse;

      return response.status(statusCode).json(body);
    }

    request.metadata = {
      ...request.metadata,
      ...middlewareResponse.data,
    };
    next();
  };
}
