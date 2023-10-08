export default function verifyObject<T extends object>(
  objectToCheck: T,
  requiredKeys: (keyof T)[]
): boolean {
  for (const key of requiredKeys) {
    if (!(key in objectToCheck)) {
      return false;
    }
  }

  return true;
}
