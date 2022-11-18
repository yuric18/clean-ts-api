import { ExpressRouteAdapter } from '@/main/adapters/ExpressRouteAdapter';
import {
  makeAddSurveyController,
  makeLoadSurveysController,
} from '@/main/factories';
import { adminAuth } from '@/main/middlewares';
import { Router } from 'express';

export default (router: Router): void => {
  router.post(
    '/surveys',
    adminAuth,
    ExpressRouteAdapter(makeAddSurveyController())
  );
  router.get(
    '/surveys',
    adminAuth,
    ExpressRouteAdapter(makeLoadSurveysController())
  );
};
