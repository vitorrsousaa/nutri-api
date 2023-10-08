import 'express-async-errors';

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import corsOptions from './shared/http/middlewares/cors';
import errorHandler from './shared/http/middlewares/errorHandler';
import routes from './shared/http/routes';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);

app.use(errorHandler);

export default app;
