"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bicycle_router_1 = __importDefault(require("./app/modules/bicycle/bicycle.router"));
const error_middleware_1 = __importDefault(require("./app/middleware/error.middleware"));
const order_router_1 = __importDefault(require("./app/modules/order/order.router"));
const utils_error_1 = require("./app/utils/errors/utils.error");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Welcome To Our Bike Store !');
});
app.use('/api/products', bicycle_router_1.default);
app.use('/api/orders', order_router_1.default);
app.use((req, res, next) => {
    const error = new utils_error_1.CustomError(`Entered Route Is Invalid`, 'Invalid Route', 404, {});
    next(error);
});
app.use(error_middleware_1.default);
exports.default = app;
