import { SurveyResultModel } from '@/domain/entities/SurveyResult';

export interface LoadSurveyResultRepository {
  loadBySurveyId(surveyId: string): Promise<SurveyResultModel>;
}
