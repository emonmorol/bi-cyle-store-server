"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    const statusCode = error.statusCode || 500;
    // Structure the response
    const response = {
        message: error.name === 'ZodError'
            ? 'Given Data Is Invalid'
            : typeof error.message === 'string'
                ? error.message
                : error.name,
        success: false,
        error: error,
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    };
    res.status(statusCode).json(response);
};
exports.default = errorHandler;
