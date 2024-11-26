import { NextFunction, Request, Response } from 'express';
import { userService } from './bicycle.services';
import { TBicycle } from './bicycle.interface';

const createBicycle = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const data: TBicycle = req.body;

        const result = await userService.createBicycle(data);

        res.status(200).json({
            success: true,
            message: 'Bicycle created successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        next(error);
    }
};

const getBicycles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { searchTerm } = req.body;

        console.log(searchTerm);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        next(error);
    }
};

export const bicycleController = {
    createBicycle,
    getBicycles,
};
