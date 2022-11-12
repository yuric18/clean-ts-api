import {
  LoadSurveyById,
  LoadSurveyByIdRepository,
  SurveyModel,
} from './DbLoadSurveyByIdProtocols';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadById(id: string): Promise<SurveyModel> {
    return this.loadSurveyByIdRepository.loadById(id);
  }
}
