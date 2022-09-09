import { Controller } from '../../../presentation/protocols';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/LogMongoRepository';
import { LogControllerDecorator } from '../../decorators/LogControllerDecorator';

export const makeLogControllerDecorator = (controller): Controller => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
