import express, { Express } from 'express';
import { setupApolloServer } from '../graphql';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import setupSwagger from './swagger';

export const setupApp = async (): Promise<Express> => {
  const app = express();
  setupSwagger(app);
  setupMiddlewares(app);
  setupRoutes(app);

  const apolloServer = setupApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  return app;
};
