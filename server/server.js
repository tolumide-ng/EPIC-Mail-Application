/* eslint-disable import/no-extraneous-dependencies */
/* credit: Olawale Aladeusi */
import express from 'express';
import bodyParser from 'body-parser';
import Epicmail from './src/controllers/controller';

const app = express();
app.use(bodyParser.urlencoded({ // Middleware
  extended: true,
}));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => res.status(200).send({ message: 'YAY! Congratulations! Your first endpoint is working' }));
app.post('/api/v1/auth/signup', Epicmail.createAUser);

/* when the function is called, it should listen on a port */
/* To automatically pick port on the server instead of usin a single port */
const port = process.env.port || 6000;
app.listen(port, () => console.log(`Listening on ${port}`));

export default app;