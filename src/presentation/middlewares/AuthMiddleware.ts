import { LoadAccountByTokenRepository } from '../../data/protocols/db/account/LoadAccountByTokenRepository';
import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers/http/HttpHelper';
import { HttpRequest, HttpResponse, Middleware } from '../protocols';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByTokenRepository,
    private readonly role?: string,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.headers?.['x-access-token']) return forbidden(new AccessDeniedError());
  
      const account = await this.loadAccountByToken.loadByToken(httpRequest.headers['x-access-token'], this.role);
      if (!account) return forbidden(new AccessDeniedError());
  
      return ok({ accountId: account.id });
    } catch (e) {
      return serverError(e);
    }
  }

}