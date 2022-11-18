import { LoadSurveyById, SaveSurveyResult } from '@/domain';

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
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle(input: SaveSurveyResultController.Input): Promise<HttpResponse> {
    try {
      const { accountId, surveyId, answer } = input;
      const survey = await this.loadSurveyById.loadById(surveyId);

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }

      const answers = survey.answers.map((a) => a.answer);
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
