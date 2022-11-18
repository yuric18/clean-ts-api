import { ExpressRouteAdapter } from '@/main/adapters/ExpressRouteAdapter';
import { makeLoginController, makeSignUpController } from '@/main/factories';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/signup', ExpressRouteAdapter(makeSignUpController()));
  router.post('/login', ExpressRouteAdapter(makeLoginController()));
};
