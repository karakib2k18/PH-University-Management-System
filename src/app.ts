/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Response, Request } from 'express';
import cors from 'cors';
import { globalErrorHandeler } from './app/middlewares/globalErrorhandeler';
import { notFound } from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//perser
app.use(express.json());
app.use(cors());

// all application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
  // res.send('Hello PH UNIVERSTIY');
};

app.get('/', test);

//global error handler
app.use(globalErrorHandeler);

//not found route
app.use(notFound);

export default app;
