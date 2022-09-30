import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory';
import { makeDbLoadSurveys } from '../../usecases/loadSurveys/DbLoadSurveys';

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = makeDbLoadSurveys();
  return makeLogControllerDecorator(loadSurveysController);
};
