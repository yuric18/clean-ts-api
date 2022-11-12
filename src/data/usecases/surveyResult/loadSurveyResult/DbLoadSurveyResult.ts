import { LoadSurveyResultRepository } from '@/data/protocols/db/surveyResult/LoadSurveyResultRepository';
import { SurveyResultModel } from '@/domain/entities/SurveyResult';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import { LoadSurveyByIdRepository } from '../../survey/loadSurveyById/DbLoadSurveyByIdProtocols';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) { }

  async load(surveyId: string): Promise<SurveyResultModel> {
    const surveyResultFound = await this.loadSurveyResultRepository.loadBySurveyId(surveyId);

    if (!surveyResultFound) {
      await this.loadSurveyByIdRepository.loadById(surveyId);
    }

    return surveyResultFound;
  }
}