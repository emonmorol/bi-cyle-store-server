import { Request, Response, NextFunction } from 'express';

const errorHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.status(error.statusCode || 500).json({
        message: error.name || 'Something went wrong',
        success: false,
        error,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
    next();
};

export default errorHandler;
