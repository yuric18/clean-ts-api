import { badRequest, serverError } from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse, Validation, AddSurvey } from './AddSurveyControllerProtocols';

export class AddSurveyController implements Controller {

  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try { 
      const error = await this.validation.validate(httpRequest.body);
  
      if (error) {
        return badRequest(error);
      }
  
      await this.addSurvey.add(httpRequest.body);
  
      return null;
    } catch (e) {
      return serverError(e);
    }
  }

}