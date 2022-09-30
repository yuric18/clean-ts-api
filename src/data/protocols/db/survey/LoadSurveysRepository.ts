import { SurveyModel } from '@/domain/entities/Survey';

export interface LoadSurveysRepository {
  loadAll(): Promise<SurveyModel[]>
}