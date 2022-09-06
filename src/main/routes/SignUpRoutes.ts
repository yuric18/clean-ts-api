import { Router } from 'express';
import { makeSignUpController } from "../factories/signup/SignUpFactory";
import { ExpressRouteAdapter } from "../adapters/ExpressRoute";

export default (router: Router): void => {
  router.post('/signup', ExpressRouteAdapter(makeSignUpController()))
}
