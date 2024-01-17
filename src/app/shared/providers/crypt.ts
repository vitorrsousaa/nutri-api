import bcrypt from 'bcryptjs';

import { ICrypt } from '../interfaces/crypt';

class CryptProvider implements ICrypt {
  hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}

export const Crypt = new CryptProvider();
