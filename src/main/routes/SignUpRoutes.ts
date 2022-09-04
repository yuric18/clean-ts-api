import { Router } from 'express';
import { makeSignUpController } from "../factories/signup/SignUp";
import { ExpressRouteAdapter } from "../adapters/ExpressRoute";

export default (router: Router): void => {
  router.post('/signup', ExpressRouteAdapter(makeSignUpController()))
}
