import { SurveyModel } from '@/domain';

export interface LoadSurveysRepository {
  loadAll(accountId: string): Promise<SurveyModel[]>;
}
