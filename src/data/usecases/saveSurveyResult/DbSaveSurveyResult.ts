import { 
  SaveSurveyResultRepository, 
  SaveSurveyResultModel, 
  SurveyResultModel, 
  SaveSurveyResult,
} from './DbSaveSurveyResultProtocols';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
  ) {}

  async save(survey: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(survey);
    return null;
  }

}