import * as http from 'http';
import app from './server';

http
  .createServer(app)
  .listen(process.env.PORT || 8080, () => console.log(`Express running on: ${process.env.PORT || 8080}`));
