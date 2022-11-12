import { LogErrorRepository } from '../protocols/db/log/LogErrorRepository';

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new LogErrorRepositoryStub();
};
