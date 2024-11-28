import mongoose from 'mongoose';

export type TOrder = {
    email: string;
    product: mongoose.Types.ObjectId; // Correct type for ObjectId
    quantity: number;
    totalPrice: number;
};

export type TRevenue = {
    totalRevenue: number;
};
