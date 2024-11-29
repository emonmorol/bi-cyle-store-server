import { NextFunction, Request, Response } from 'express';
import { userService } from './bicycle.services';
import { TBicycle } from './bicycle.interface';
import { CustomError } from '../../utils/errors/utils.error';

const createBicycle = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const data: TBicycle = req.body;

        const result = await userService.createBicycle(data);
        if (result) {
            res.status(200).json({
                message: 'Bicycle created successfully',
                success: true,
                data: result,
            });
        } else {
            throw new CustomError(
                'Failed To create bicycle',
                'Unknown Error occurred',
                404,
                data,
            );
        }
    } catch (error) {
        next(error);
    }
};

const getBicycles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getBicycles(req);
        if (result) {
            res.status(200).json({
                message: 'Bicycle retrieved successfully',
                success: true,
                data: result,
            });
        } else {
            throw new CustomError(
                'Data Not Found!',
                'Invalid Input',
                404,
                result,
            );
        }
    } catch (error) {
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

        if (result) {
            res.status(200).json({
                message: 'Bicycle retrieved successfully',
                success: true,
                data: result,
            });
        } else {
            throw new CustomError(
                'Product Not Found!',
                'Invalid Id',
                404,
                productId,
            );
        }
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
            throw new CustomError(
                'Product Not Found!',
                'Invalid Id',
                404,
                productId,
            );
        }
    } catch (error) {
        next(error);
    }
};

const deleteBicycleById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { productId } = req.params;

        const result = await userService.deleteBicycleById(productId);

        if (result) {
            res.status(200).json({
                message: 'Bicycle deleted successfully',
                success: true,
                data: result,
            });
        } else {
            throw new CustomError(
                'Product Not Found!',
                'Invalid Id',
                404,
                productId,
            );
        }
    } catch (error) {
        next(error);
    }
};
export const bicycleController = {
    createBicycle,
    getBicycles,
    getBicycleById,
    updateBicycleById,
    deleteBicycleById,
};
