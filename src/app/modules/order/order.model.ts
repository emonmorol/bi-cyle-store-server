import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema: Schema<TOrder> = new Schema<TOrder>(
    {
        email: { type: String, required: true, trim: true }, // Email field with validation
        product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Bicycle',
        }, // Product reference (unused ref)
        quantity: { type: Number, required: true, min: 1 }, // Quantity should be at least 1
        totalPrice: { type: Number, required: true, min: 0 }, // Total price must be non-negative
    },
    {
        timestamps: true,
    },
);

const Order = model<TOrder>('Order', orderSchema);

export default Order;
