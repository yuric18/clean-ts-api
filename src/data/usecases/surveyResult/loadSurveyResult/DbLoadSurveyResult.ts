import { LoadSurveyResultRepository } from '@/data/protocols/db/surveyResult/LoadSurveyResultRepository';
import { SurveyResultModel } from '@/domain/entities/SurveyResult';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
  ) { }

  async load(surveyId: string): Promise<SurveyResultModel> {
    return this.loadSurveyResultRepository.loadBySurveyId(surveyId);
  }
}