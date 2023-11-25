import express, { Application, Response, Request } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
const app: Application = express();

//perser
app.use(express.json());
app.use(cors());

//api/v1/student/create-student

// application routes
app.use('/api/v1/students', StudentRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Hello jaan');
};

app.get('/', getAController);

// console.log(process.cwd());

export default app;
