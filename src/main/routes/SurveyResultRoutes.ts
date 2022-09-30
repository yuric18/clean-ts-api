import { makeSaveSurveyResultController } from '@/main/factories/controllers/surveyResult/SaveSurveyResultControllerFactory';
import { Router } from 'express';
import { auth } from '../middlewares';
import { ExpressRouteAdapter } from '@/main/adapters/ExpressRouteAdapter';

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, ExpressRouteAdapter(makeSaveSurveyResultController()));
};
