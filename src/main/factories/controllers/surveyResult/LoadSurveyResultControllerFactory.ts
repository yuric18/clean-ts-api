import { LoadSurveyResultController } from '@/presentation/controllers/surveyResult/loadSurveyResult/LoadSurveyResultController';
import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory';
import { makeDbLoadSurveyById } from '../../usecases/survey/loadSurveyById/DbLoadSurvesByIdFactory';
import { makeDbLoadSurveyResult } from '../../usecases/surveyResult/loadSurveyResult/DbLoadSurveyResultFactory';

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult()
  );
  return makeLogControllerDecorator(controller);
};
