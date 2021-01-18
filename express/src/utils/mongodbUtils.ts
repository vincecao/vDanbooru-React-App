const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const getUri = (dbname: string) =>
  `"mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ug9iq.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const MongoClient = require('mongodb').MongoClient;

export const getConnectedClient = (defaultDbName: string): any =>
  new MongoClient(getUri(defaultDbName), { useNewUrlParser: true });

export const getCollection = (client: any, dbName: string, collectionName: string): Promise<any> =>
  new Promise((resolve, reject) =>
    client.connect((err: Error) => {
      console.log(client);
      if (err) throw err;
      const collection = client.db(dbName).collection(collectionName);
      resolve(collection);
      client.close();
    })
  );
