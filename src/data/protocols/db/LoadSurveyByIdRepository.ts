import { SurveyModel } from '@/domain';

export interface LoadSurveyByIdRepository {
  loadById(id: string): Promise<LoadSurveyByIdRepository.Output>;
}

export namespace LoadSurveyByIdRepository {
  export type Output = SurveyModel;
}
