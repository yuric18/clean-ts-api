import { Router } from 'express';
import { adminAuth, auth } from '../middlewares';
import { ExpressRouteAdapter } from '../adapters/ExpressRouteAdapter';
import { makeAddSurveyController } from '../factories/controllers/survey/AddSurveyControllerFactory';
import { makeLoadSurveysController } from '../factories/controllers/survey/LoadSurveysControllerFactory';

export default (router: Router): void => {
  router.post('/surveys', adminAuth, ExpressRouteAdapter(makeAddSurveyController()));
  router.get('/surveys', adminAuth, ExpressRouteAdapter(makeLoadSurveysController()));
};
