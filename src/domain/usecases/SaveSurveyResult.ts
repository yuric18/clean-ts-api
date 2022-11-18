import { SurveyResultModel } from '@/domain';

export type SaveSurveyResultModel = {
  surveyId: string;
  accountId: string;
  answer: string;
  date: Date;
};

export interface SaveSurveyResult {
  save(survey: SaveSurveyResultModel): Promise<SurveyResultModel>;
}
