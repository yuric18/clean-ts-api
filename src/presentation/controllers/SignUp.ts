import { MissingParamError } from "../errors/MissingParamError"
import { badRequest } from "../helpers/HttpHelper"
import { HttpRequest, HttpResponse } from "../protocols/IHttp"

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'name',
      'email'
    ];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}