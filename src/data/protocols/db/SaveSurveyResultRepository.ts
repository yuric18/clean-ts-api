import { SaveSurveyResultModel } from '@/domain';

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultModel): Promise<void>;
}
