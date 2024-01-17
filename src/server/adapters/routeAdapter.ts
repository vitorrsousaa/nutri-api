import { Request, Response } from 'express';

import { IController } from '../../app/interfaces/controller';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle({
      body: request.body,
      accountId: request.metadata?.accountId,
      params: request.params,
      patientId: request.metadata?.patientId,
    });

    response.status(statusCode).json(body);
  };
}
