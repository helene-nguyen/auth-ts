//~import module
import { MongoClient } from 'mongodb';
//~ Import Debug
import debug from 'debug';
const logger = debug('Pool');

//& function that allows you to retrieve the list of our available databases
// async function listDatabases(client) {
//     const databasesList = await client.db().admin().listDatabases();

//     console.log('Databases:');
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// }

//~connexion
const url : string = process.env.CONNEXION_STRING!;
const client = new MongoClient(url);

client
  .connect()
  .then(() => logger('DB connected'))
  .catch((err) => logger('DB connection failed', err));

  // await listDatabases(client);

export default client;
