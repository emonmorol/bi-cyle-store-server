/* eslint-disable @typescript-eslint/no-explicit-any */
export class CustomError extends Error {
    statusCode: number;

    errors: any;

    constructor(message: string, name: string, statuscode: number, value: any) {
        super(message);
        this.name = name;
        this.statusCode = statuscode;
        this.errors = {
            name,
            message,
            value,
        };
    }
}
