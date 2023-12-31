import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { UserRoutes } from './app/modules/users/users.router';

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api', UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Welcome to user management system!');
};

app.get('/', getAController);

export default app;
