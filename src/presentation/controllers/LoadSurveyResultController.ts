import { LoadSurveyResult, LoadSurveyById } from '@/domain';

import {
  Controller,
  HttpRequest,
  HttpResponse,
  forbidden,
  ok,
  serverError,
  InvalidParamError,
} from '@/presentation';

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        accountId,
        params: { surveyId },
      } = httpRequest;

      const survey = await this.loadSurveyById.loadById(surveyId);

      if (!survey) return forbidden(new InvalidParamError('surveyId'));

      const result = await this.loadSurveyResult.load(surveyId, accountId);
      return ok(result);
    } catch (e) {
      return serverError(e);
    }
  }
}
