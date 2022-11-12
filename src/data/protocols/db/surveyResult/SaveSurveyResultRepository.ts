import { SaveSurveyResultModel } from '@/domain/usecases/surveyResult/SaveSurveyResult';

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultModel): Promise<void>;
}