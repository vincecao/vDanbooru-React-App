import { Request, Response, Router } from 'express';
import { getBooruImage } from '../services/safebooruService';

const controller = (router: Router) => {
  const getImageAdvanced = (req: Request, res: Response): Promise<Response> => {
    const { type, t, n } = req.params;
    return getBooruImage(type, t, Number(n))
      .then((data: string | object) => res.json(data))
      .catch((error: Error) =>
        res.status(500).json({
          error: error.message,
        })
      );
  };

  router.get('/mode/:type/tag/:t/num/:n', getImageAdvanced);
};

export default controller;
