import { z } from 'zod';

const orderValidationSchema = z.object({
    email: z
        .string()
        .email({
            message:
                'Invalid email format. Please provide a valid email address.',
        })
        .nonempty({ message: 'Email is required.' }),
    product: z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, {
            message: 'Product must be a valid MongoDB ObjectId.',
        })
        .nonempty({ message: 'Product ID is required.' }),
    quantity: z
        .number()
        .min(0)
        .positive({ message: 'Quantity must be a positive number.' }),
    totalPrice: z
        .number()
        .min(0, { message: 'Total price must be zero or a positive value.' }),
});

export default orderValidationSchema;
