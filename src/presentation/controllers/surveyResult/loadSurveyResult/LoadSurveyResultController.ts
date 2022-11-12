import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import { forbidden } from '@/presentation/helpers/http/HttpHelper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { InvalidParamError } from '../saveSurveyResult/SaveSurveyResultControllerProtocols';

export class LoadSurveyResultController implements Controller {
  constructor(private readonly loadSurveyResult: LoadSurveyResult) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params;

    const surveyResult = await this.loadSurveyResult.load(surveyId);

    if (!surveyResult) return forbidden(new InvalidParamError('surveyId'));
    return null;
  }
}
