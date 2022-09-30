import { SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/surveyResult/saveSurveyResult/DbSaveSurveyResultProtocols';
import { MongoHelper } from '../helpers/MongoHelper';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await MongoHelper.getCollection('surveyResults');
    const { value } = await MongoHelper.collection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId,
    }, { 
      $set: { answer: data.answer, date: data.date },
    }, { 
      upsert: true,
      returnDocument: 'after',
    });
    return value && MongoHelper.map(value);
  }

}