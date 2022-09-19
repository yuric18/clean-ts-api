import { Router } from 'express';
import { ExpressRouteAdapter } from '../adapters/ExpressRoute';
import { makeAddSurveyController } from '../factories/controllers/survey/AddSurveyControllerFactory';

export default (router: Router): void => {
  router.post('/surveys', ExpressRouteAdapter(makeAddSurveyController()));
};
