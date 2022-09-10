import { MongoHelper } from '../helpers/MongoHelper';
import { AddSurveyModel, AddSurveyRepository } from '../../../../data/usecases/addSurvey/DbAddSurveyProtocols';

export class SurveyMongoRepository implements AddSurveyRepository {
  async add(survey: AddSurveyModel): Promise<void> {
    await MongoHelper.getCollection('surveys');
    await MongoHelper.insert(survey);
    return null;
  }
}
