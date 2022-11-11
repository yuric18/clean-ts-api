import { SurveyResultModel } from '../../entities/SurveyResult';

export interface LoadSurveyResult {
  load(surveyId: string): Promise<SurveyResultModel>
}