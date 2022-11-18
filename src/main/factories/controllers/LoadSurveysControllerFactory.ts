import {
  makeDbLoadSurveys,
  makeLogControllerDecorator,
} from '@/main/factories';
import { Controller, LoadSurveysController } from '@/presentation';

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys());
  return makeLogControllerDecorator(loadSurveysController);
};
