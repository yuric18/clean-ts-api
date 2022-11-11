import { SurveyResultModel } from '../../entities/SurveyResult';

export interface LoadSurveyResult {
  save(surveyId: string): Promise<SurveyResultModel>
}