import AppError from '../error';

interface ObjectWithKeys {
  [key: string]: unknown;
}

export default function returnErrorMissingField(
  objectToCheck: ObjectWithKeys,
  requiredKeys: string[]
): void {
  for (const key of requiredKeys) {
    if (!(key in objectToCheck)) {
      throw new AppError(`Missing fields: ${key}`, 400);
    }
  }
}
