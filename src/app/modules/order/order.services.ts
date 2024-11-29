import { CustomError } from '../../utils/errors/utils.error';
import Bicycle from '../bicycle/bicycle.model';

import { TOrder, TRevenue } from './order.interface';
import Order from './order.model';
import orderValidationSchema from './order.zod.validation';

const createOrder = async (order: TOrder): Promise<TOrder | null> => {
    const validOrder = await orderValidationSchema.parseAsync(order);

    const bicycle = await Bicycle.findById(validOrder.product);
    if (!bicycle) {
        throw new CustomError(
            `Bicycle does not exists`,
            'Invalid Product Id',
            500,
            validOrder,
        );
    }

    const { quantity: orderQuantity } = validOrder;
    const { quantity: bicycleQuantity } = bicycle;

    if (orderQuantity > bicycleQuantity) {
        throw new CustomError(
            `Insufficient quantity. Available product: ${bicycleQuantity}`,
            'Invalid Quantity',
            500,
            { orderQuantity, bicycleQuantity },
        );
    }

    bicycle.quantity = bicycleQuantity - orderQuantity;

    if (orderQuantity === bicycleQuantity) {
        bicycle.inStock = false;
    }

    const updatedBicycle = await bicycle.save();
    if (!updatedBicycle) {
        throw new CustomError(
            `Order Failed , Try Again`,
            'Unexpected Error',
            500,
            { orderQuantity, bicycleQuantity },
        );
    }

    const result: TOrder = await Order.create(validOrder);

    return result;
};

const calculateRevenue = async (): Promise<TRevenue> => {
    try {
        const revenue = await Order.aggregate([
            {
                $lookup: {
                    from: 'bicycles',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            {
                $unwind: '$productDetails',
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: {
                            $multiply: ['$quantity', '$productDetails.price'],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                },
            },
        ]);

        return revenue[0] as TRevenue;
    } catch (error) {
        throw new CustomError(
            'Failed To calculated the revenue. Try Again!',
            'Unexpected Error',
            500,
            error,
        );
    }
};

export const orderServices = {
    createOrder,
    calculateRevenue,
};
