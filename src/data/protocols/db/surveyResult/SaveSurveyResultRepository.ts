import { SurveyResultModel } from '@/domain/entities/SurveyResult';
import { SaveSurveyResultModel } from '@/domain/usecases/surveyResult/SaveSurveyResult';

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel>;
}