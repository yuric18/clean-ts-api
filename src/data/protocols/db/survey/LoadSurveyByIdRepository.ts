import { SurveyModel } from '@/domain/entities/Survey';

export interface LoadSurveyByIdRepository {
  loadById(id: string): Promise<SurveyModel>
}