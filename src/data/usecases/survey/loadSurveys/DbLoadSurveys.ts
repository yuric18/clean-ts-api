import {
  LoadSurveys,
  LoadSurveysRepository,
  SurveyModel,
} from './DbLoadSurveysProtocols';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load(accountId): Promise<SurveyModel[]> {
    return this.loadSurveysRepository.loadAll(accountId);
  }
}
