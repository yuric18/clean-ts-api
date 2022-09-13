import { HttpRequest, HttpResponse } from './IHttp';

export interface Middleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
