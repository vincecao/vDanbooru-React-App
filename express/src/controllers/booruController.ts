import { Request, Response, Router } from 'express';
import * as service from '../services/booruService';
import * as mongodbUtils from '../utils/mongodbUtils';

const controller = (router: Router) => {
  const getImageAdvanced = (req: Request, res: Response): Promise<Response> => {
    const { site, type, t, n } = req.params;
    return service
      .getBooruImage(site, type, t, Number(n))
      .then((data: string | object) => res.json(data))
      .catch((error: Error) =>
        res.status(500).json({
          error: error.message,
        })
      );
  };

  const getSitesList = (req: Request, res: Response): Promise<Response> => {
    return service
      .getBooruSiteList()
      .then((data: object) => res.json(data))
      .catch((error: Error) =>
        res.status(500).json({
          error: error.message,
        })
      );
  };

  const getDataFromDB = (req: Request, res: Response): Promise<Response> => {
    const { dbName, colName } = req.params;
    const client = mongodbUtils.getConnectedClient(dbName);
    console.log(client);
    return mongodbUtils
      .getCollection(client, dbName, colName)
      .then((data: object) => res.json(data))
      .catch((error: Error) =>
        res.status(500).json({
          error: error.message,
        })
      );
  };

  router.get('/:site/:type/tag/:t/num/:n', getImageAdvanced);
  router.get('/sitesList', getSitesList);
  router.get('/db/:dbName/col/:colName', getDataFromDB);
};

export default controller;
