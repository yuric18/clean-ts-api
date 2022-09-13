import { LoadAccountByTokenRepository } from '../../data/protocols/db/account/LoadAccountByTokenRepository';
import { AccessDeniedError } from '../errors';
import { forbidden, ok } from '../helpers/http/HttpHelper';
import { HttpRequest, HttpResponse, Middleware } from '../protocols';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByTokenRepository,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.headers?.['x-access-token']) return forbidden(new AccessDeniedError());

    const account = await this.loadAccountByToken.loadByToken(httpRequest.headers['x-access-token']);
    if (!account) return forbidden(new AccessDeniedError());

    return ok({ accountId: account.id });
  }

}