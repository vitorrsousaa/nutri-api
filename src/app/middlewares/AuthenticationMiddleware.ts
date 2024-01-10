import {
  IData,
  IMiddleware,
  IRequest,
  IResponse,
} from '../interfaces/middleware';
import Token from '../shared/providers/token';

export class AuthenticationMiddleware implements IMiddleware {
  async handle(request: IRequest): Promise<IResponse | IData> {
    const { authorization } = request.headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token',
        },
      };
    }

    try {
      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer') {
        throw new Error();
      }

      const payload = Token.verify(token);

      return {
        data: {
          accountId: payload.id,
        },
      };
    } catch (error) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token',
        },
      };
    }
  }
}
