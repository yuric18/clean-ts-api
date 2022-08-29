import { HttpResponse } from "../protocols/IHttp";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
});