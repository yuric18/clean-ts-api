import {
  makeDbCheckSurveyById,
  makeDbLoadSurveyResult,
  makeLogControllerDecorator,
} from '@/main/factories';
import { Controller, LoadSurveyResultController } from '@/presentation';

export const makeLoadSurveyResultController =
  (): Controller<LoadSurveyResultController.Input> => {
    const controller = new LoadSurveyResultController(
      makeDbCheckSurveyById(),
      makeDbLoadSurveyResult()
    );
    return makeLogControllerDecorator(controller);
  };
