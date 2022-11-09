import { badRequest, notFound, serverError, unauthorized } from './components';
import { loginPath } from './paths';
import { loginSchema, accountSchema, errorSchema } from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean API',
    description: 'Clean API for studying purposes',
    version: '2.0.0',
    license: {
      name: 'GPL-3.0-or-later',
      url: 'http://opensource.org/licenses/GPL-3.0',
    },
  },
  servers: [
    { url: '/api' },
  ],
  tags: [
    { name: 'Login' },
  ],
  paths: {
    '/login': loginPath,
  },
  schemas: {
    account: accountSchema,
    login: loginSchema,
    error: errorSchema,
  },
  components: {
    badRequest: badRequest,
    serverError: serverError,
    unauthorized: unauthorized,
    notFound: notFound,
  },
};