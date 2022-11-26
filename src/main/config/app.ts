import express from 'express';
import setupGraphQl from './graphql';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import setupSwagger from './swagger';

const app = express();
setupGraphQl(app);
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);

export default app;
