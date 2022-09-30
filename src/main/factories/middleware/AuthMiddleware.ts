import { AuthMiddleware } from '@/presentation/middlewares/AuthMiddleware';
import { Middleware } from '@/presentation/protocols';
import { makeDbLoadAccountByToken } from '../usecases/loadAccountByToken/LoadAccountByTokenFactory';

export const makeAuthMiddlware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role);
};