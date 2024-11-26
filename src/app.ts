import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bicycleRouter from './app/modules/bicycle/bicycle.router';
import errorHandler from './app/middleware/error.middleware';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', bicycleRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not Found');
    next(error);
});

app.use(errorHandler);

export default app;
