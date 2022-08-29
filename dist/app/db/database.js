import { MongoClient } from 'mongodb';
import debug from 'debug';
const logger = debug('Pool');
const url = process.env.CONNEXION_STRING;
const client = new MongoClient(url);
client
    .connect()
    .then(() => logger('DB connected'))
    .catch((err) => logger('DB connection failed', err));
export default client;
//# sourceMappingURL=database.js.map