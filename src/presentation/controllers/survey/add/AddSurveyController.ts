import { badRequest } from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse, Validation } from './AddSurveyControllerProtocols';

export class AddSurveyController implements Controller {

  constructor(
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(httpRequest.body);

    if (error) {
      return badRequest(error);
    }
    
    return;
  }

}