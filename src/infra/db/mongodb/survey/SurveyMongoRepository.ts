import { MongoHelper } from '../helpers/MongoHelper';
import { AddSurveyModel, AddSurveyRepository } from '../../../../data/usecases/addSurvey/DbAddSurveyProtocols';
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/LoadSurveysRepository';
import { SurveyModel } from '../../../../domain/entities/Survey';

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add(survey: AddSurveyModel): Promise<void> {
    await MongoHelper.getCollection('surveys');
    await MongoHelper.insert(survey);
    return null;
  }

  async loadAll(): Promise<SurveyModel[]> {
    await MongoHelper.getCollection('surveys');
    const surveys = await MongoHelper.collection.find().toArray();
    return surveys.map(s => MongoHelper.map(s));
  }
}
