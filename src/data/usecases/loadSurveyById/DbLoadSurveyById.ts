import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/LoadSurveyByIdRepository';
import { SurveyModel } from '@/domain/entities/Survey';
import { LoadSurveyById } from '@/domain/usecases/LoadSurveyById';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}
 
  async loadById(id: string): Promise<SurveyModel> {
    return this.loadSurveyByIdRepository.loadById(id);
  }
}