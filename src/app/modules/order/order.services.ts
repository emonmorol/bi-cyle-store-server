import Bicycle from '../bicycle/bicycle.model';

import { TOrder, TRevenue } from './order.interface';
import Order from './order.model';
import orderValidationSchema from './order.zod.validatin';

const createOrder = async (order: TOrder): Promise<TOrder | null> => {
    const validOrder = await orderValidationSchema.parseAsync(order);

    const bicycle = await Bicycle.findById(validOrder.product);
    if (!bicycle) {
        throw new Error('Product Is not available');
    }

    const { quantity: orderQuantity } = validOrder;
    const { quantity: bicycleQuantity } = bicycle;

    if (orderQuantity > bicycleQuantity) {
        throw new Error(
            `Insufficient quantity. Available product: ${bicycleQuantity}`,
        );
    }

    bicycle.quantity = bicycleQuantity - orderQuantity;

    if (orderQuantity === bicycleQuantity) {
        bicycle.inStock = false;
    }

    const updatedBicycle = await bicycle.save();
    if (!updatedBicycle) {
        throw new Error(`Order Failed , Try Again`);
    }

    const result: TOrder = await Order.create(validOrder);

    return result;
};

const calculateRevenue = async (): Promise<TRevenue> => {
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
};

export const orderServices = {
    createOrder,
    calculateRevenue,
};
