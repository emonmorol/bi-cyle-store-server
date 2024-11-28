import { model, Schema } from 'mongoose';
import { TBicycle } from './bicycle.interface';

const bicycleSchema: Schema<TBicycle> = new Schema<TBicycle>(
    {
        name: { type: String, required: true, trim: true },
        brand: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        type: {
            type: String,
            required: true,
            enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        },
        description: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true, min: 0 },
        inStock: { type: Boolean, required: true, default: true },
    },
    {
        timestamps: true,
    },
);

const Bicycle = model<TBicycle>('Bicycle', bicycleSchema);

export default Bicycle;
