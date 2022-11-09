import { makeSaveSurveyResultController } from '@/main/factories/controllers/surveyResult/SaveSurveyResultControllerFactory';
import { Router } from 'express';
import { adminAuth } from '../middlewares';
import { ExpressRouteAdapter } from '@/main/adapters/ExpressRouteAdapter';

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', adminAuth, ExpressRouteAdapter(makeSaveSurveyResultController()));
};
