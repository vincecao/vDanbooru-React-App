import express from 'express';
import { urlencoded, json } from 'body-parser';
import booruController from './controllers/booruController';
import dbController from './controllers/mongodnController';
import { getCorsOptions } from './utils/utils';
const app = express();
const router = express.Router();
const cors = require('cors');

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use('/api', router);

router.use(cors(getCorsOptions()));

booruController(router);
dbController(router);

export default app;
