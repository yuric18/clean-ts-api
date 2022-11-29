import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';

import resolvers from '@/main/graphql/resolvers';
import typeDefs from '@/main/graphql/typedefs';
import { authDirectiveTransformer } from '@/main/graphql/directives';

import { GraphQLError } from 'graphql';

const checkError = (error: GraphQLError, errorName: string): boolean =>
  [error.name, error.originalError?.name].some((n) => n === errorName);

const errorMappings = [
  { name: 'UserInputError', code: 400 },
  { name: 'AuthenticationError', code: 401 },
  { name: 'ForbiddenError', code: 403 },
];

const getStatus = (e) => errorMappings.find((m) => checkError(e, m.name));

const handleErrors = (response, errors: readonly GraphQLError[]): void => {
  const errorFound = errors?.map(getStatus).filter((s) => !!s)[0].code;
  const hasError = errors?.some(getStatus);
  response.data = hasError ? undefined : response.data;
  response.http.status = hasError ? errorFound : response.http.status;
};

let schema = makeExecutableSchema({ typeDefs, resolvers });
schema = authDirectiveTransformer(schema);

export const setupApolloServer = (): ApolloServer =>
  new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    plugins: [
      {
        requestDidStart: async () => ({
          willSendResponse: async ({ response, errors }) =>
            handleErrors(response, errors),
        }),
      },
    ],
  });
