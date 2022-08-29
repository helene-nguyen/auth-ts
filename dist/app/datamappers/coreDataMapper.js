import { ObjectId, MongoClient } from 'mongodb';
class CoreDataMapper {
    dbName = 'authme';
    constructor(client) {
        this.client = client;
    }
    async findAll() {
        if (this.client instanceof MongoClient) {
            const db = this.client.db(this.dbName);
            const collection = db.collection(this.collectionName);
            const result = await collection.find().toArray();
            return result;
        }
    }
    async findOne(id) {
        if (this.client instanceof MongoClient) {
            const database = this.client.db(this.dbName);
            const collection = database.collection(this.collectionName);
            if (ObjectId.isValid(id) === false)
                return null;
            const result = await collection.findOne({ _id: new ObjectId(id) });
            return result;
        }
    }
    async create(inputData) {
        if (this.client instanceof MongoClient) {
            const db = this.client.db(this.dbName);
            const collection = db.collection(this.collectionName);
            const result = await collection.insertOne(inputData);
            if (!result.acknowledged)
                return null;
            return result.acknowledged;
        }
    }
    async updateOne(id, inputData) {
        if (this.client instanceof MongoClient) {
            const database = this.client.db(this.dbName);
            const collection = database.collection(this.collectionName);
            const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: inputData });
            return result;
        }
    }
    async delete(id) {
        if (this.client instanceof MongoClient) {
            const database = this.client.db(this.dbName);
            const collection = database.collection(this.collectionName);
            const result = await collection.deleteOne({ _id: new ObjectId(id) });
            return result;
        }
    }
}
export { CoreDataMapper };
//# sourceMappingURL=coreDataMapper.js.map