import { Router } from 'express';
import { ExpressRouteAdapter } from '../adapters/ExpressRoute';
import { makeSignUpController } from '../factories/controllers/signup/SignUpControllerFactory';
import { makeLoginController } from '../factories/controllers/login/LoginControllerFactory';

export default (router: Router): void => {
  router.post('/signup', ExpressRouteAdapter(makeSignUpController()));
  router.post('/login', ExpressRouteAdapter(makeLoginController()));
};
