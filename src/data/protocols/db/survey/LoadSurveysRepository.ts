import { SurveyModel } from '@/domain/entities/Survey';

export interface LoadSurveysRepository {
  loadAll(accountId: string): Promise<SurveyModel[]>;
}
