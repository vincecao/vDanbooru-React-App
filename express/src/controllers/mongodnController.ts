import { Request, Response, Router } from 'express';
import * as mongodbUtils from '../utils/mongodbUtils';

const controller = (router: Router) => {
  const getDataFromDB = async (req: Request, res: Response): Promise<Response> => {
    const { dbName, colName } = req.params;
    const { getConnectedClient, getCollection } = mongodbUtils;
    return getConnectedClient(dbName)
      .then((client: any) => getCollection(client, dbName, colName))
      .then((data: object) => res.json(data))
      .catch((error: Error) =>
        res.status(500).json({
          error: error.message,
        })
      );
  };

  router.get('/db/:dbName/col/:colName', getDataFromDB);
};

export default controller;
