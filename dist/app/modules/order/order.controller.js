"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_services_1 = require("./order.services");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const result = yield order_services_1.orderServices.createOrder(order);
        if (result) {
            res.status(200).json({
                message: 'Order created successfully',
                success: true,
                data: result,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const calculateRevenue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_services_1.orderServices.calculateRevenue();
        if (result) {
            res.status(200).json({
                message: 'Revenue calculated successfully',
                success: true,
                data: result,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.orderController = {
    createOrder,
    calculateRevenue,
};
