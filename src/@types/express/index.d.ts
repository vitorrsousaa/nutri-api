// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';

declare global {
  module Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Request {
      user: {
        id: string;
      };
    }
  }
}
