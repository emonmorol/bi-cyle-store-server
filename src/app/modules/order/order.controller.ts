import { NextFunction, Request, Response } from 'express';
import { orderServices } from './order.services';

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
        }
    } catch (error) {
        next(error);
    }
};

export const orderController = {
    createOrder,
};
