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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const bicycle_model_1 = __importDefault(require("../bicycle/bicycle.model"));
const order_model_1 = __importDefault(require("./order.model"));
const order_zod_validation_1 = __importDefault(require("./order.zod.validation"));
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const validOrder = yield order_zod_validation_1.default.parseAsync(order);
    const bicycle = yield bicycle_model_1.default.findById(validOrder.product);
    if (!bicycle) {
        throw new Error('Product Is not available');
    }
    const { quantity: orderQuantity } = validOrder;
    const { quantity: bicycleQuantity } = bicycle;
    if (orderQuantity > bicycleQuantity) {
        throw new Error(`Insufficient quantity. Available product: ${bicycleQuantity}`);
    }
    bicycle.quantity = bicycleQuantity - orderQuantity;
    if (orderQuantity === bicycleQuantity) {
        bicycle.inStock = false;
    }
    const updatedBicycle = yield bicycle.save();
    if (!updatedBicycle) {
        throw new Error(`Order Failed , Try Again`);
    }
    const result = yield order_model_1.default.create(validOrder);
    return result;
});
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenue = yield order_model_1.default.aggregate([
        {
            $lookup: {
                from: 'bicycles',
                localField: 'product',
                foreignField: '_id',
                as: 'productDetails',
            },
        },
        {
            $unwind: '$productDetails',
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: {
                        $multiply: ['$quantity', '$productDetails.price'],
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ]);
    return revenue[0];
});
exports.orderServices = {
    createOrder,
    calculateRevenue,
};
