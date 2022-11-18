import { AddSurvey, SurveyAnswerModel } from '@/domain';

import {
  Controller,
  HttpResponse,
  Validation,
  badRequest,
  noContent,
  serverError,
} from '@/presentation';

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle(input: AddSurveyController.Input): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(input);

      if (error) {
        return badRequest(error);
      }

      const { answers, question } = input;

      await this.addSurvey.add({
        answers,
        question,
        date: new Date(),
      });

      return noContent();
    } catch (e) {
      return serverError(e);
    }
  }
}

export namespace AddSurveyController {
  export type Input = {
    question: string;
    answers: SurveyAnswerModel[];
  };
}
