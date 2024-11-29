import { NextFunction, Request, Response } from 'express';
import { orderServices } from './order.services';
import { CustomError } from '../../utils/errors/utils.error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = req.body;
        const result = await orderServices.createOrder(order);
        if (result) {
            res.status(200).json({
                message: 'Order created successfully',
                success: true,
                data: result,
            });
        } else {
            throw new CustomError(
                `Order Failed , Try Again`,
                'Unexpected Error',
                500,
                order,
            );
        }
    } catch (error) {
        next(error);
    }
};

const calculateRevenue = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await orderServices.calculateRevenue();

        if (result) {
            res.status(200).json({
                message: 'Revenue calculated successfully',
                success: true,
                data: result,
            });
        } else {
            throw new CustomError(
                `Failed To Calculate Revenue`,
                'Unexpected Error',
                500,
                result,
            );
        }
    } catch (error) {
        next(error);
    }
};

export const orderController = {
    createOrder,
    calculateRevenue,
};
