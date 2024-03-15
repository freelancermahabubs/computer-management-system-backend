/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlwares/globalErrorhandler';
import router from './app/routes';
import notFound from './app/middlwares/notFound';
import morgan from 'morgan';


const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
// application Routes

app.use('/api', router);

const test = async (req: Request, res: Response) => {
  res.send('Hello Server!');
};
app.get('/', test);

app.use(globalErrorHandler);

app.use(notFound);
export default app;
