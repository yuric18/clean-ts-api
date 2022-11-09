import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';
import config from '@/main/docs';
import { noCache } from '../middlewares';

export default (app: Express): void => {
  app.use('/docs/swagger', noCache, serve, setup(config));
};
