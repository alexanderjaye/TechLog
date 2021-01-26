import * as express from 'express';
import * as cors from 'cors';
import router from './router';

// require('dotenv').config();

//Config
const app: express.Application = express();

//Middleware
app.use(
  express.json(),
  cors(),
  router
);

export default app;
