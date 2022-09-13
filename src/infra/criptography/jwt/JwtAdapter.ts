import jwt from 'jsonwebtoken';
import { Decrypter } from '../../../data/protocols/criptography/Decrypter';
import { Encrypter } from '../../../data/protocols/criptography/Encrypter';

export class JwtAdapter implements Encrypter, Decrypter {

  constructor(private readonly secret: string) {}
  
  async encrypt(value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret);
  }

  async decrypt(value: string): Promise<string> {
    await jwt.verify(value, this.secret);
    return null;
  }

}
