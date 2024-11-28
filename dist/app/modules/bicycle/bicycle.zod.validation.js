"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const bicycleValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(1, { message: 'Name is required and cannot be empty' })
        .refine((val) => typeof val === 'string', {
        message: 'Name must be a string',
    }),
    brand: zod_1.z
        .string()
        .trim()
        .min(1, { message: 'Brand is required and cannot be empty' })
        .refine((val) => typeof val === 'string', {
        message: 'Brand must be a string',
    }),
    price: zod_1.z
        .number()
        .min(0, { message: 'Price must be a non-negative number' })
        .refine((val) => typeof val === 'number', {
        message: 'Price must be a valid number',
    }),
    type: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
        errorMap: () => ({
            message: 'Type must be one of the following: Mountain, Road, Hybrid, BMX, Electric',
        }),
    }),
    description: zod_1.z
        .string()
        .trim()
        .min(1, { message: 'Description is required and cannot be empty' })
        .refine((val) => typeof val === 'string', {
        message: 'Description must be a string',
    }),
    quantity: zod_1.z
        .number()
        .min(0, { message: 'Quantity must be a non-negative number' })
        .refine((val) => typeof val === 'number', {
        message: 'Quantity must be a valid number',
    }),
    inStock: zod_1.z
        .boolean()
        .or(zod_1.z.undefined())
        .transform((val) => (val === undefined ? true : val)),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.default = bicycleValidationSchema;
