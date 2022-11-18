import { ExpressRouteAdapter } from '@/main/adapters/ExpressRouteAdapter';
import {
  makeLoadSurveyResultController,
  makeSaveSurveyResultController,
} from '@/main/factories';
import { auth } from '@/main/middlewares';
import { Router } from 'express';

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
