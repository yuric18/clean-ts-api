import { Controller } from '@/presentation';
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-express';

export const ApolloServerResolverAdapter = async (
  controller: Controller,
  args: any
) => {
  const response = await controller.handle(args);
  switch (response.statusCode) {
    case 200:
      return response.body;
    case 204:
      return response.body;
    case 400:
      throw new UserInputError(response.body.message);
    case 401:
      throw new AuthenticationError(response.body.message);
    case 403:
      throw new ForbiddenError(response.body.message);
    default:
      throw new ApolloError(response.body.message);
  }
};
