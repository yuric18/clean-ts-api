import jwt from 'jsonwebtoken';
import { Decrypter } from '@/data/protocols/criptography/Decrypter';
import { Encrypter } from '@/data/protocols/criptography/Encrypter';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret);
  }

  async decrypt(token: string): Promise<string> {
    const value: any = await jwt.verify(token, this.secret);
    return value;
  }
}
