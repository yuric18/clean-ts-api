import { LoadSurveyResultRepository, SaveSurveyResultRepository } from '@/data';
import { SaveSurveyResult } from '@/domain';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save(survey: SaveSurveyResult.Input): Promise<SaveSurveyResult.Output> {
    await this.saveSurveyResultRepository.save(survey);
    const dbSurvey = await this.loadSurveyResultRepository.loadBySurveyId(
      survey.surveyId,
      survey.accountId
    );
    return dbSurvey;
  }
}
