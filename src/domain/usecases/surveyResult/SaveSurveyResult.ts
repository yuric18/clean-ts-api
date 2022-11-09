import { SurveyResultModel } from '../../entities/SurveyResult';

export type SaveSurveyResultModel = {
  surveyId: string
  accountId: string
  answer: string
  date: Date
};

export interface SaveSurveyResult {
  save(survey: SaveSurveyResultModel): Promise<SurveyResultModel>
}
