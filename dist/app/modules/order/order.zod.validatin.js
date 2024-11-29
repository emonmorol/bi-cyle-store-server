'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const zod_1 = require('zod');
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({
            message:
                'Invalid email format. Please provide a valid email address.',
        })
        .nonempty({ message: 'Email is required.' }),
    product: zod_1.z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, {
            message: 'Product must be a valid MongoDB ObjectId.',
        })
        .nonempty({ message: 'Product ID is required.' }),
    quantity: zod_1.z
        .number()
        .min(0)
        .positive({ message: 'Quantity must be a positive number.' }),
    totalPrice: zod_1.z
        .number()
        .min(0, { message: 'Total price must be zero or a positive value.' }),
});
exports.default = orderValidationSchema;
