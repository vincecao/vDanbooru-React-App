import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors, { CorsOptions } from 'cors';
import controller from './controllers/booruController';
import { getCorsOptions } from './utils/utils';

const app = express();
const router = express.Router();

app.use(json());
app.use(
  urlencoded({
    extended: true,
  }),
);

app.use('/api', router);

router.use(cors(getCorsOptions() as CorsOptions));

controller(router);

export default app;
