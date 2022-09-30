import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  forbidden,
  serverError,
  ok,
  InvalidParamError,
  SaveSurveyResult,
} from './SaveSurveyResultControllerProtocols';

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest;
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;
      const survey = await this.loadSurveyById.loadById(surveyId);
  
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }

      const answers = survey.answers.map(a => a.answer);
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