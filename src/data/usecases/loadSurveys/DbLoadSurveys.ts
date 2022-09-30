import { SurveyModel } from '@/domain/entities/Survey';
import { LoadSurveys } from '@/domain/usecases/LoadSurveys';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/LoadSurveysRepository';

export class DbLoadSurveys implements LoadSurveys {
  constructor(
    private readonly loadSurveysRepository: LoadSurveysRepository,
  ) {}
 
  async load(): Promise<SurveyModel[]> {
    return this.loadSurveysRepository.loadAll();
  }

}