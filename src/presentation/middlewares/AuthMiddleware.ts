import { HttpRequest, HttpResponse, Middleware, LoadAccountByToken } from './AuthMiddlewareProtocols';
import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers/http/HttpHelper';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.headers?.['x-access-token']) return forbidden(new AccessDeniedError());
  
      const account = await this.loadAccountByToken.load(httpRequest.headers['x-access-token'], this.role);
      if (!account) return forbidden(new AccessDeniedError());
  
      return ok({ accountId: account.id });
    } catch (e) {
      return serverError(e);
    }
  }

}