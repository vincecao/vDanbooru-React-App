import express from 'express';
import { urlencoded, json } from 'body-parser';
import controller from './controllers/safebooruController';
const app = express();
const router = express.Router();

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use('/api', router);
controller(router);

export default app;
