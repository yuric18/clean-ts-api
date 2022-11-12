import {
  noContent,
  ok,
  serverError,
} from '@/presentation/helpers/http/HttpHelper';
import {
  Controller,
  HttpResponse,
  HttpRequest,
  LoadSurveys,
} from './LoadSurveysControllerProtocols';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load();
      return surveys.length ? ok(surveys) : noContent();
    } catch (e) {
      return serverError(e);
    }
  }
}
