/* eslint-disable consistent-return */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-console */
import '@babel/polyfill';
/* eslint-disable import/no-extraneous-dependencies */
/* credit: Olawale Aladeusi */
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import env from 'dotenv';
import path from 'path';
import Epicmail from './src/controllers/controller';
import router from './src/usingDB/routes';
// for API documentation
import swaggerDocument from '../swagger.json';
// import check token through destructuring
import { checkToken } from './src/middleware';

// initialize .env file for the secret stuff
env.config();

const app = express();
app.use(bodyParser.urlencoded({ // Middleware
  extended: true,
}));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname.slice(0, -6), 'views'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('UI/img'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(router);

app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to EPIC MAIL' }));
app.all('*', (req, res) => res.status(404).send({ message: 'you have entered an incorrect route' }));
app.get('/api/v1/users/:id', checkToken, Epicmail.getOneUser);

console.log(__dirname.slice(0, -6));
/* when the function is called, it should listen on a port */
/* To automatically pick port on the server instead of usin a single port */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));

export default app;
