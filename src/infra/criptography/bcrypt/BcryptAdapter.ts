import bcrypt from 'bcrypt';
import { Hasher } from '../../../data/protocols/criptography/Hasher';
import { HashComparer } from '../../../data/protocols/criptography/HashComparer';

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(
    private readonly salt: number,
  ) {}

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
