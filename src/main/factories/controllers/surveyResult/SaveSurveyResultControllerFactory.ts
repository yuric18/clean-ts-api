import { SaveSurveyResultController } from '@/presentation/controllers/surveyResult/saveSurveyResult/SaveSurveyResultController';
import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory';
import { makeDbLoadSurveyById } from '../../usecases/survey/loadSurveyById/DbLoadSurvesByIdFactory';
import { makeDbSaveSurveyResult } from '../../usecases/surveyResult/saveSurveyResult/DbSaveSurveyResultFactory';

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveyResult()
  );
  return makeLogControllerDecorator(controller);
};
