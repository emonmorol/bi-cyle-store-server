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
const utils_error_1 = require("../../utils/errors/utils.error");
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
        else {
            throw new utils_error_1.CustomError('Failed To create bicycle', 'Unknown Error occurred', 404, data);
        }
    }
    catch (error) {
        next(error);
    }
});
const getBicycles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bicycle_services_1.userService.getBicycles(req);
        if (result) {
            res.status(200).json({
                message: 'Bicycle retrieved successfully',
                success: true,
                data: result,
            });
        }
        else {
            throw new utils_error_1.CustomError('Data Not Found!', 'Invalid Input', 404, result);
        }
    }
    catch (error) {
        next(error);
    }
});
const getBicycleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield bicycle_services_1.userService.getBicyclesById(productId);
        if (result) {
            res.status(200).json({
                message: 'Bicycle retrieved successfully',
                success: true,
                data: result,
            });
        }
        else {
            throw new utils_error_1.CustomError('Product Not Found!', 'Invalid Id', 404, productId);
        }
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
            throw new utils_error_1.CustomError('Product Not Found!', 'Invalid Id', 404, productId);
        }
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
            throw new utils_error_1.CustomError('Product Not Found!', 'Invalid Id', 404, productId);
        }
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
