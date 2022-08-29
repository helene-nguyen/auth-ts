//~import modules
import { ObjectId, MongoClient } from 'mongodb';

//~Define types
interface CoreDataMapper {
  client: object;
  dbName: string;
  collectionName: string;
}

class CoreDataMapper {
  dbName = 'authme';

  constructor(client: object) {
    this.client = client;
  }

  //& Find All
  async findAll() {
    if (this.client instanceof MongoClient) {
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);

      const result = await collection.find().toArray();

      return result;
    }
  }

  //& Find One
  async findOne(id: string) {
    if (this.client instanceof MongoClient) {
      const database = this.client.db(this.dbName);
      const collection = database.collection(this.collectionName);

      if (ObjectId.isValid(id) === false) return null;
      const result = await collection.findOne({ _id: new ObjectId(id) });

      return result;
    }
  }

  //& Create
  async create(inputData: Object) {
    if (this.client instanceof MongoClient) {
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);

      const result = await collection.insertOne(inputData);

      if (!result.acknowledged) return null;

      return result.acknowledged;
    }
  }

  //& Update
  async updateOne(id: string, inputData: object) {
    if (this.client instanceof MongoClient) {
      const database = this.client.db(this.dbName);
      const collection = database.collection(this.collectionName);

      const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: inputData });

      return result;
    }
  }

  //& Delete
  async delete(id: string) {
    if (this.client instanceof MongoClient) {
      const database = this.client.db(this.dbName);
      const collection = database.collection(this.collectionName);

      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result;
    }
  }
}

export { CoreDataMapper };
