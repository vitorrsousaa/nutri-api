import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';

import swaggerDocument from '../../swagger-output.json';
import corsOptions from '../app/shared/http/middlewares/cors';
import errorHandler from '../app/shared/http/middlewares/errorHandler';
import routesApp from '../app/shared/http/routes';

import routes from './routes';

const server = express();

server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan('dev'));
server.use(routes);
server.use(routesApp);
server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(errorHandler);

export default server;
