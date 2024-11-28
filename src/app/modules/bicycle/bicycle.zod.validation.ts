import { z } from 'zod';

const bicycleValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: 'Name is required and cannot be empty' })
        .refine((val) => typeof val === 'string', {
            message: 'Name must be a string',
        }),

    brand: z
        .string()
        .trim()
        .min(1, { message: 'Brand is required and cannot be empty' })
        .refine((val) => typeof val === 'string', {
            message: 'Brand must be a string',
        }),

    price: z
        .number()
        .min(0, { message: 'Price must be a non-negative number' })
        .refine((val) => typeof val === 'number', {
            message: 'Price must be a valid number',
        }),

    type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
        errorMap: () => ({
            message:
                'Type must be one of the following: Mountain, Road, Hybrid, BMX, Electric',
        }),
    }),

    description: z
        .string()
        .trim()
        .min(1, { message: 'Description is required and cannot be empty' })
        .refine((val) => typeof val === 'string', {
            message: 'Description must be a string',
        }),

    quantity: z
        .number()
        .min(0, { message: 'Quantity must be a non-negative number' })
        .refine((val) => typeof val === 'number', {
            message: 'Quantity must be a valid number',
        }),

    inStock: z
        .boolean()
        .or(z.undefined())
        .transform((val) => (val === undefined ? false : val)),

    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const zodValidation = {
    bicycleValidationSchema,
};
