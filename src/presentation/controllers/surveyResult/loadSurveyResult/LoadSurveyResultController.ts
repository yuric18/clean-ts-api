import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import {
  forbidden,
  ok,
  serverError,
} from '@/presentation/helpers/http/HttpHelper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import {
  InvalidParamError,
  LoadSurveyById,
} from '../saveSurveyResult/SaveSurveyResultControllerProtocols';

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;

      const survey = await this.loadSurveyById.loadById(surveyId);

      if (!survey) return forbidden(new InvalidParamError('surveyId'));

      const result = await this.loadSurveyResult.load(surveyId);
      return ok(result);
    } catch (e) {
      return serverError(e);
    }
  }
}
