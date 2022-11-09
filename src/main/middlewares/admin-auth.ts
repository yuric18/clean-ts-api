import { ExpressMiddlewareAdapter } from '../adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '../factories/middleware/AuthMiddleware';

export const adminAuth = ExpressMiddlewareAdapter(makeAuthMiddleware('admin'));