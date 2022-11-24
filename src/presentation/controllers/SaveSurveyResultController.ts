import { LoadAnswersBySurvey, SaveSurveyResult } from '@/domain';

import {
  Controller,
  HttpResponse,
  forbidden,
  serverError,
  ok,
  InvalidParamError,
} from '@/presentation';

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadAnswersBySurvey: LoadAnswersBySurvey,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle(input: SaveSurveyResultController.Input): Promise<HttpResponse> {
    try {
      const { accountId, surveyId, answer } = input;
      const answers = await this.loadAnswersBySurvey.loadBySurvey(surveyId);

      if (!answers) {
        return forbidden(new InvalidParamError('surveyId'));
      }

      if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'));
      }

      const result = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date(),
      });

      return ok(result);
    } catch (e) {
      return serverError(e);
    }
  }
}

export namespace SaveSurveyResultController {
  export type Input = {
    accountId: string;
    surveyId: string;
    answer: string;
  };
}
