import {
  makeDbLoadSurveyById,
  makeDbSaveSurveyResult,
  makeLogControllerDecorator,
} from '@/main/factories';
import { Controller, SaveSurveyResultController } from '@/presentation';

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveyResult()
  );
  return makeLogControllerDecorator(controller);
};
