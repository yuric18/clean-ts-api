import {Controller, HttpRequest, HttpResponse, Validation, Authentication} from "./LoginProtocols";
import {badRequest, ok, serverError, unauthorized} from "../../helpers/HttpHelper";

export class LoginController implements Controller {

  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {};

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body);
      if (validationError) return badRequest(validationError);

      const { email, password } = httpRequest.body;

      const accessToken = await this.authentication.auth(email, password);
      if (!accessToken) {
        return unauthorized();
      }

      return ok(accessToken);
    } catch (e) {
      return serverError(e);
    }
  }

}
