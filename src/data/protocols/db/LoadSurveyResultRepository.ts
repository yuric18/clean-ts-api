import { SurveyResultModel } from '@/domain';

export interface LoadSurveyResultRepository {
  loadBySurveyId(
    surveyId: string,
    accountId: string
  ): Promise<LoadSurveyResultRepository.Output>;
}

export namespace LoadSurveyResultRepository {
  export type Output = SurveyResultModel;
}
