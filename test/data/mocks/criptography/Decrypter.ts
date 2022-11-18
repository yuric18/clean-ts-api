import { Decrypter } from '@/index';

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(token: string): Promise<string> {
      return Promise.resolve('any_token');
    }
  }
  return new DecrypterStub();
};
