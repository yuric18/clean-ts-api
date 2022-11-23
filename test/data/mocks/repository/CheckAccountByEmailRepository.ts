import { CheckAccountByEmailRepository } from '@/index';

export const mockCheckAccountByEmailRepository =
  (): CheckAccountByEmailRepository => {
    class CheckAccountByEmailRepositoryStub
      implements CheckAccountByEmailRepository
    {
      async checkByEmail(email: string): Promise<boolean> {
        return Promise.resolve(false);
      }
    }
    return new CheckAccountByEmailRepositoryStub();
  };
