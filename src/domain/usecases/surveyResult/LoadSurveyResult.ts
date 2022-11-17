import { SurveyResultModel } from '../../entities/SurveyResult';

export interface LoadSurveyResult {
  load(surveyId: string, accountId: string): Promise<SurveyResultModel>;
}
