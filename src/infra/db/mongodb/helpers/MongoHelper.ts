import { Collection, MongoClient, ObjectId } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient,
  collection: null as Collection,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },
  async disconnect(): Promise<void> {
    await this.client.close();
  },
  getCollection(name: string): void {
    this.collection = this.client.db().collection(name);
  },
  async insert<T>(data: T): Promise<T & { id: string }> {
    const options = { upsert: true, returnDocument: 'after' };
    const { value: document } = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $setOnInsert: data },
      options
    );
    return this.map(document);
  },
  map<T>(document: T & { _id: string }): T & { id: string } {
    return { ...document, id: document._id };
  }
};
