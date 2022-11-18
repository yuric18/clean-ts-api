import { HashComparer } from '@/index';

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new HashComparerStub();
};
