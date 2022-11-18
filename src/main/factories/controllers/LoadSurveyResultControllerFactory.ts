import {
  makeDbLoadSurveyById,
  makeDbLoadSurveyResult,
  makeLogControllerDecorator,
} from '@/main/factories';
import { Controller, LoadSurveyResultController } from '@/presentation';

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult()
  );
  return makeLogControllerDecorator(controller);
};