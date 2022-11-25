import { HttpResponse } from './IHttp';

export interface Middleware<T = any> {
  handle(input: T): Promise<HttpResponse>;
}
