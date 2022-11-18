import { LoadSurveys } from '@/domain';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  noContent,
  ok,
  serverError,
} from '@/presentation';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(httpRequest.accountId);
      return surveys.length ? ok(surveys) : noContent();
    } catch (e) {
      return serverError(e);
    }
  }
}
