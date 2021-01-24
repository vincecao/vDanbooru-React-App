const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const getUri = (dbname: string) =>
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ug9iq.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const MongoClient = require('mongodb').MongoClient;

export const getConnectedClient = (defaultDbName: string): any =>
  new Promise((resolve, reject) =>
    MongoClient.connect(
      getUri(defaultDbName),
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err: Error, client: any) => {
        if (err) throw err;
        console.log('Connected successfully to server.');
        resolve(client);
      }
    )
  );

export const getCollection = (client: any, dbName: string, collectionName: string): Promise<any> =>
  new Promise((resolve, reject) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    collection.find({}).toArray((err: Error, data: object) => {
      if (err) throw err;
      console.log(`Connected successfully to ${dbName}.${collectionName}.`);
      resolve(data);
      client.close();
      console.log('Server closed.');
    });
  });
