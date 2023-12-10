/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Response, Request } from 'express';
import cors from 'cors';
import { globalErrorHandeler } from './app/config/middlewares/globalErrorhandeler';
import { notFound } from './app/config/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//perser
app.use(express.json());
app.use(cors());

// all application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  res.send('Hello PH UNIVERSTIY');
};

app.get('/', test);

//global error handler
app.use(globalErrorHandeler);

//not found route
app.use(notFound);

export default app;
