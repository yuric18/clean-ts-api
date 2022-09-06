import { LogErrorRepository } from "../../../../data/protocols/LogErrorRepository";
import { MongoHelper } from "../helpers/MongoHelper";

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    await MongoHelper.getCollection('errors');
    await MongoHelper.collection.insertOne({
      stack,
      date: new Date()
    });
  };
}
