import { LoadSurveys } from '@/domain';
import {
  Controller,
  HttpResponse,
  noContent,
  ok,
  serverError,
} from '@/presentation';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}

  async handle({
    accountId,
  }: LoadSurveysController.Input): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(accountId);
      return surveys.length ? ok(surveys) : noContent();
    } catch (e) {
      return serverError(e);
    }
  }
}

export namespace LoadSurveysController {
  export type Input = {
    accountId: string;
  };
}
