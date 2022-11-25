import { SurveyResultModel } from '@/domain';

export interface SaveSurveyResult {
  save(survey: SaveSurveyResult.Input): Promise<SaveSurveyResult.Output>;
}

export namespace SaveSurveyResult {
  export type Input = {
    surveyId: string;
    accountId: string;
    answer: string;
    date: Date;
  };
  export type Output = SurveyResultModel;
}
