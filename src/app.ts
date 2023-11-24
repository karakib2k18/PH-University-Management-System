import express, { Application, Response, Request } from 'express';
import cors from 'cors';
const app: Application = express();

//perser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello jaan');
});

// console.log(process.cwd());

export default app;
