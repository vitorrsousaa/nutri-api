// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';

declare global {
  module Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}
