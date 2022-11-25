import { SurveyModel } from '@/domain';

export interface LoadSurveysRepository {
  loadAll(accountId: string): Promise<LoadSurveysRepository.Output>;
}

export namespace LoadSurveysRepository {
  export type Output = SurveyModel[];
}
