import express from 'express';
import { urlencoded, json } from 'body-parser';
import controller from './controllers/safebooruController';
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

controller(router);

export default app;
