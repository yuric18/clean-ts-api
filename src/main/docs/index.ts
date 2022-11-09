import { badRequest, forbidden, notFound, serverError, unauthorized } from './components';
import { loginPath, surveysPath } from './paths';
import { loginSchema, accountSchema, errorSchema, surveyAnswersSchema, surveySchema, apiKeyAuthSchema } from './schemas';

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
    { name: 'Enquete' },
  ],
  paths: {
    '/login': loginPath,
    '/surveys': surveysPath,
  },
  schemas: {
    account: accountSchema,
    login: loginSchema,
    error: errorSchema,
    survey: surveySchema,
    surveyAnswers: surveyAnswersSchema,
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema,
    },
    badRequest: badRequest,
    serverError: serverError,
    unauthorized: unauthorized,
    notFound: notFound,
    forbidden: forbidden,
  },
};