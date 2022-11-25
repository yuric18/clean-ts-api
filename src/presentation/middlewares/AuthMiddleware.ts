import { LoadAccountByToken } from '@/domain';
import {
  forbidden,
  ok,
  serverError,
  AccessDeniedError,
  HttpResponse,
  Middleware,
} from '@/presentation';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle({ accessToken }: AuthMiddleware.Input): Promise<HttpResponse> {
    try {
      if (!accessToken) return forbidden(new AccessDeniedError());

      const account = await this.loadAccountByToken.load(
        accessToken,
        this.role
      );
      if (!account) return forbidden(new AccessDeniedError());

      return ok({ accountId: account.id });
    } catch (e) {
      return serverError(e);
    }
  }
}

export namespace AuthMiddleware {
  export type Input = {
    accessToken?: string;
  };
}
