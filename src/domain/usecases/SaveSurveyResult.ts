import { SurveyResultModel } from '../entities/SurveyResult';

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>;

export interface SaveSurveyResult {
  save(survey: SaveSurveyResultModel): Promise<SurveyResultModel>
}
