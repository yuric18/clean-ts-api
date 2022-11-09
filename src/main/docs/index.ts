import { loginSchema, accountSchema } from './schemas';
import { loginPath } from './paths';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean API',
    description: 'Clean API for studying purposes',
    version: '2.0.0',
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
  },
};