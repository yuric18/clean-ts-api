import { LoadSurveyResult, CheckSurveyById } from '@/domain';

import {
  Controller,
  HttpResponse,
  forbidden,
  ok,
  serverError,
  InvalidParamError,
} from '@/presentation';

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly checkSurveyById: CheckSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle({
    accountId,
    surveyId,
  }: LoadSurveyResultController.Input): Promise<HttpResponse> {
    try {
      const survey = await this.checkSurveyById.checkById(surveyId);

      if (!survey) return forbidden(new InvalidParamError('surveyId'));

      const result = await this.loadSurveyResult.load(surveyId, accountId);
      return ok(result);
    } catch (e) {
      return serverError(e);
    }
  }
}

export namespace LoadSurveyResultController {
  export type Input = {
    accountId: string;
    surveyId: string;
  };
}
