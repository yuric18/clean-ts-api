import { MongoHelper } from '../helpers/MongoHelper';
import {
  AddSurveyParams,
  AddSurveyRepository,
} from '@/data/usecases/survey/addSurvey/DbAddSurveyProtocols';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/LoadSurveysRepository';
import { SurveyModel } from '@/domain/entities/Survey';
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/loadSurveyById/DbLoadSurveyByIdProtocols';
import { ObjectId } from 'mongodb';

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository
{
  async add(survey: AddSurveyParams): Promise<void> {
    await MongoHelper.getCollection('surveys');
    await MongoHelper.insert(survey);
    return null;
  }

  async loadAll(): Promise<SurveyModel[]> {
    await MongoHelper.getCollection('surveys');
    const surveys = await MongoHelper.collection.find().toArray();
    return MongoHelper.mapArray(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    await MongoHelper.getCollection('surveys');
    const survey = await MongoHelper.collection.findOne({
      _id: new ObjectId(id),
    });
    return survey && MongoHelper.map(survey);
  }
}
