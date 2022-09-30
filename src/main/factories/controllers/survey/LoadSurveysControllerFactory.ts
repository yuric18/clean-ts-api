import { LoadSurveysController } from '@/presentation/controllers/survey/load/LoadSurveysController';
import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory';
import { makeDbLoadSurveys } from '../../usecases/loadSurveys/DbLoadSurveys';

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys());
  return makeLogControllerDecorator(loadSurveysController);
};