import { Router } from 'express';
import { ExpressMiddlewareAdapter } from '../adapters/ExpressMiddlewareAdapter';
import { ExpressRouteAdapter } from '../adapters/ExpressRouteAdapter';
import { makeAddSurveyController } from '../factories/controllers/survey/AddSurveyControllerFactory';
import { makeAuthMiddlware } from '../factories/middleware/AuthMiddleware';

export default (router: Router): void => {
  const adminAuth = ExpressMiddlewareAdapter(makeAuthMiddlware());
  router.post('/surveys', adminAuth, ExpressRouteAdapter(makeAddSurveyController()));
};
