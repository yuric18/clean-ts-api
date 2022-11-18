import { Controller } from '@/presentation/protocols';
import { LogMongoRepository } from '@/infra';
import { LogControllerDecorator } from '@/main/decorators/LogControllerDecorator';

export const makeLogControllerDecorator = (controller): Controller => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
