import { makeSaveSurveyResultController } from '@/main/factories/controllers/surveyResult/SaveSurveyResultControllerFactory';
import { Router } from 'express';
import { auth } from '../middlewares';
import { ExpressRouteAdapter } from '@/main/adapters/ExpressRouteAdapter';
import { makeLoadSurveyResultController } from '../factories/controllers/surveyResult/LoadSurveyResultControllerFactory';

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    ExpressRouteAdapter(makeSaveSurveyResultController())
  );

  router.get(
    '/surveys/:surveyId/results',
    auth,
    ExpressRouteAdapter(makeLoadSurveyResultController())
  );
};
