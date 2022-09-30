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
    return this.saveSurveyResultRepository.save(survey);
  }

}