import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';

import resolvers from '@/main/graphql/resolvers';
import typeDefs from '@/main/graphql/typedefs';
import { GraphQLError } from 'graphql';

const handleErrors = (response, errors: GraphQLError[]) => {
  if (
    errors.some(
      (e) =>
        e.name === 'AuthenticationError' ||
        e.originalError.name === 'AuthenticationError'
    )
  ) {
    response.data = undefined;
    response.http.status = 401;
  }
};

const checkError = (error: GraphQLError, errorName: string): boolean =>
  error.name === errorName || error.originalError.name === errorName;

export default async (app: Express): Promise<void> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      {
        requestDidStart: () => ({
          willSendResponse: ({ response, errors }) => {},
        }),
      },
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
};
