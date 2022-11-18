import { Hasher } from '@/data';

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return Promise.resolve('any_password');
    }
  }
  return new HasherStub();
};
