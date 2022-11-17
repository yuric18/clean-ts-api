import { LoadSurveyResultRepository } from '@/data/protocols/db/surveyResult/LoadSurveyResultRepository';
import {
  SaveSurveyResultRepository,
  SaveSurveyResultModel,
  SurveyResultModel,
  SaveSurveyResult,
} from './DbSaveSurveyResultProtocols';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save(survey: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(survey);
    const dbSurvey = await this.loadSurveyResultRepository.loadBySurveyId(
      survey.surveyId,
      survey.accountId
    );
    return dbSurvey;
  }
}
