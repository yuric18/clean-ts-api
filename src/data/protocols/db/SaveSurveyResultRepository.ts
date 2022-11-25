import { SaveSurveyResult } from '@/domain';

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultRepository.Input): Promise<void>;
}

export namespace SaveSurveyResultRepository {
  export type Input = SaveSurveyResult.Input;
}
