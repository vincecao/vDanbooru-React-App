import app from './server';
import * as http from 'http';

http
  .createServer(app)
  .listen(process.env.PORT || 8080, () => console.log(`Express running on: ${process.env.PORT || 8080}`));
