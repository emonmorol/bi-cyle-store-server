"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bicycleSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
const Bicycle = (0, mongoose_1.model)('Bicycle', bicycleSchema);
exports.default = Bicycle;
