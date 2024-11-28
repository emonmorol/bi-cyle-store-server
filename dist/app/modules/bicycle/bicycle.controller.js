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
exports.bicycleController = void 0;
const bicycle_services_1 = require("./bicycle.services");
const createBicycle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield bicycle_services_1.userService.createBicycle(data);
        if (result) {
            res.status(200).json({
                message: 'Bicycle created successfully',
                success: true,
                data: result,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        next(error);
    }
});
const getBicycles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bicycle_services_1.userService.getBicycles(req);
        res.status(200).json({
            message: 'Bicycle retrieved successfully',
            success: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        next(error);
    }
});
const getBicycleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield bicycle_services_1.userService.getBicyclesById(productId);
        res.status(200).json({
            message: 'Bicycle retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateBicycleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateBody = req.body;
        const result = yield bicycle_services_1.userService.updateBicycleById(productId, updateBody);
        if (result) {
            res.status(200).json({
                message: 'Bicycle updated successfully',
                success: true,
                data: result,
            });
        }
        else {
            throw new Error('Product Not Found!');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        next(error);
    }
});
const deleteBicycleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield bicycle_services_1.userService.deleteBicycleById(productId);
        if (result) {
            res.status(200).json({
                message: 'Bicycle deleted successfully',
                success: true,
                data: result,
            });
        }
        else {
            throw new Error('Product Not Found!');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        next(error);
    }
});
exports.bicycleController = {
    createBicycle,
    getBicycles,
    getBicycleById,
    updateBicycleById,
    deleteBicycleById,
};
