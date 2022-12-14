import {
  makeDbLoadAnswersBySurvey,
  makeDbSaveSurveyResult,
  makeLogControllerDecorator,
} from '@/main/factories';
import { Controller, SaveSurveyResultController } from '@/presentation';

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(
    makeDbLoadAnswersBySurvey(),
    makeDbSaveSurveyResult()
  );
  return makeLogControllerDecorator(controller);
};
