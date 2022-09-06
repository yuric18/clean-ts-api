import { Router } from 'express';
import { ExpressRouteAdapter } from "../adapters/express/ExpressRoute";
import { makeSignUpController } from "../factories/signup/SignUpFactory";
import { makeLoginController } from "../factories/login/LoginFactory";

export default (router: Router): void => {
  router.post('/signup', ExpressRouteAdapter(makeSignUpController()))
  router.post('/login', ExpressRouteAdapter(makeLoginController()))
}
