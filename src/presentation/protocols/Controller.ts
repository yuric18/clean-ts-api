import { HttpResponse } from './IHttp';

export interface Controller<T = any> {
  handle(input: T): Promise<HttpResponse>;
}
