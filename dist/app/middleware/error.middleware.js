"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.name || 'Something went wrong',
        success: false,
        error,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
    next();
};
exports.default = errorHandler;
