import { SurveyModel } from '@/domain';

export interface LoadSurveyById {
  loadById(id: string): Promise<LoadSurveyById.Output>;
}

export namespace LoadSurveyById {
  export type Output = SurveyModel;
}
