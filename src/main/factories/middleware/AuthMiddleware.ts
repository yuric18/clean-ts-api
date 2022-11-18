import { AuthMiddleware, Middleware } from '@/presentation';
import { makeDbLoadAccountByToken } from '@/main/factories';

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role);
};
