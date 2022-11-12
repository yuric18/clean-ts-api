import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';

export class LoadSurveyResultController implements Controller {
  constructor(private readonly loadSurveyResult: LoadSurveyResult) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params;

    await this.loadSurveyResult.load(surveyId);
    return null;
  }
}
