import { MongoHelper } from '../helpers/MongoHelper';
import { AddSurveyModel, AddSurveyRepository } from '@/data/usecases/addSurvey/DbAddSurveyProtocols';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/LoadSurveysRepository';
import { SurveyModel } from '@/domain/entities/Survey';
import { LoadSurveyByIdRepository } from '@/data/usecases/loadSurveyById/DbLoadSurveyByIdProtocols';

export class SurveyMongoRepository implements AddSurveyRepository,
  LoadSurveysRepository,
  LoadSurveyByIdRepository {

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

  async loadById(id: string): Promise<SurveyModel> {
    await MongoHelper.getCollection('surveys');
    const survey = await MongoHelper.collection.findOne({ _id: id });
    return survey && MongoHelper.map(survey);
  }
}
