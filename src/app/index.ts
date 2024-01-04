import 'express-async-errors';

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../../swagger-output.json';
import corsOptions from './shared/http/middlewares/cors';
import errorHandler from './shared/http/middlewares/errorHandler';
import routes from './shared/http/routes';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
