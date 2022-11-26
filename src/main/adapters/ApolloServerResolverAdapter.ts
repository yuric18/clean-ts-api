import { Controller } from '@/presentation';

export const ApolloServerResolverAdapter = async (
  controller: Controller,
  args: any
) => {
  const httpResponse = await controller.handle(args);
  return httpResponse.body;
};
