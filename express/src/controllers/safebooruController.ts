import { Request, Response, Router } from 'express';
import * as service from '../services/safeBooruService';

const controller = (router: Router) => {
  const getImageAdvanced = (req: Request, res: Response): Promise<Response> => {
    const { type, t, n } = req.params;
    return service
      .getBooruImage(type, t, Number(n))
      .then((data) => res.json(data))
      .catch((error) =>
        res.status(500).json({
          error: error.message,
        })
      );
  };

  router.get('/mode/:type/tag/:t/num/:n', getImageAdvanced);
};

export default controller;
