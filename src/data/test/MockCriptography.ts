import { Decrypter } from '@/data/protocols/criptography/Decrypter';
import { Encrypter } from '@/data/protocols/criptography/Encrypter';
import { HashComparer } from '@/data/protocols/criptography/HashComparer';
import { Hasher } from '@/data/protocols/criptography/Hasher';

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return Promise.resolve('any_password');
    }
  }
  return new HasherStub();
};

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(token: string): Promise<string> {
      return Promise.resolve('any_token');
    }
  }
  return new DecrypterStub();
};

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(): Promise<string> {
      return Promise.resolve('any_token');
    }
  }
  return new EncrypterStub();
};

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new HashComparerStub();
};