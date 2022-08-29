import { HttpRequest, HttpResponse } from "./IHttp";

export interface Controller {
  handle(httpRequest: HttpRequest): HttpResponse
}
