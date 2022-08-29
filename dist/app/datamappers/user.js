import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
import { MongoClient } from 'mongodb';
class UserDataMapper extends CoreDataMapper {
    collectionName = 'user';
    async findUser(email) {
        if (this.client instanceof MongoClient) {
            const database = this.client.db(this.dbName);
            const collection = database.collection(this.collectionName);
            const result = await collection.findOne({ email });
            return result;
        }
    }
}
const User = new UserDataMapper(client);
export { User };
//# sourceMappingURL=user.js.map