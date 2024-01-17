declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Request {
    metadata: {
      accountId: string;
      patientId: string;
    };
  }
}
