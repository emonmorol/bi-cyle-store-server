import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bicycleRouter from './app/modules/bicycle/bicycle.router';
import errorHandler from './app/middleware/error.middleware';
import orderRouter from './app/modules/order/order.router';
import { CustomError } from './app/utils/errors/utils.error';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome To Our Bike Store !');
});
app.use('/api/products', bicycleRouter);
app.use('/api/orders', orderRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new CustomError(
        `Entered Route Is Invalid`,
        'Invalid Route',
        404,
        {},
    );
    next(error);
});

app.use(errorHandler);

export default app;
