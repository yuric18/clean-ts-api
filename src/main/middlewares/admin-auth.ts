import { ExpressMiddlewareAdapter } from '../adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddlware } from '../factories/middleware/AuthMiddleware';

export const adminAuth = ExpressMiddlewareAdapter(makeAuthMiddlware('admin'));