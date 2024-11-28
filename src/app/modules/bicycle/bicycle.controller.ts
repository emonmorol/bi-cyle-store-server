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
            message: 'Bicycle created successfully',
            success: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        next(error);
    }
};

const getBicycles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getBicycles(req);

        res.status(200).json({
            message: 'Bicycle retrieved successfully',
            success: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        next(error);
    }
};

const getBicycleById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { productId } = req.params;
        const result = await userService.getBicyclesById(productId);

        res.status(200).json({
            message: 'Bicycle retrieved successfully',
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateBicycleById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { productId } = req.params;
        const updateBody = req.body;

        const result = await userService.updateBicycleById(
            productId,
            updateBody,
        );

        if (result) {
            res.status(200).json({
                message: 'Bicycle updated successfully',
                success: true,
                data: result,
            });
        } else {
            throw new Error('Product Not Found!');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        next(error);
    }
};
export const bicycleController = {
    createBicycle,
    getBicycles,
    getBicycleById,
    updateBicycleById,
};
