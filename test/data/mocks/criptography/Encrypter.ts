import { Encrypter } from '@/index';

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(): Promise<string> {
      return Promise.resolve('any_token');
    }
  }
  return new EncrypterStub();
};
