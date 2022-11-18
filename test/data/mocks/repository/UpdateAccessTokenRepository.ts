import { UpdateAccessTokenRepository } from '@/index';

export const mockUpdateAccessTokenRepository =
  (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub
      implements UpdateAccessTokenRepository
    {
      async updateAccessToken(): Promise<void> {
        return null;
      }
    }
    return new UpdateAccessTokenRepositoryStub();
  };
