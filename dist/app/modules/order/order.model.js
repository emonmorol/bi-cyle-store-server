"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: { type: String, required: true, trim: true }, // Email field with validation
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Bicycle',
    }, // Product reference (unused ref)
    quantity: { type: Number, required: true, min: 1 }, // Quantity should be at least 1
    totalPrice: { type: Number, required: true, min: 0 }, // Total price must be non-negative
}, {
    timestamps: true,
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
