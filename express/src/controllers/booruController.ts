import { Request, Response, Router } from 'express';
import * as service from '../services/booruService';

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

  router.get('/:site/:type/tag/:t/num/:n', getImageAdvanced);
  router.get('/getSitesList', getSitesList);
};

export default controller;
