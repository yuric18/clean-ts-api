import { SurveyResultModel } from '../entities/SurveyResult';
import { SaveSurveyResultModel } from '../usecases/surveyResult/SaveSurveyResult';

export const mockSurveyResultParams = (): SaveSurveyResultModel => ({
  accountId: 'any_accountId',
  surveyId: 'any_surveyId',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSurveyResult = (): SurveyResultModel => Object.assign({}, mockSurveyResultParams(), {
  id: 'any_id',
});