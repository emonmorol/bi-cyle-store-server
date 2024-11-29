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
exports.userService = void 0;
const bicycle_model_1 = __importDefault(require("./bicycle.model"));
const bicycle_zod_validation_1 = __importDefault(require("./bicycle.zod.validation"));
const utils_error_1 = require("../../utils/errors/utils.error");
const createBicycle = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const zodParsedData = yield bicycle_zod_validation_1.default.parseAsync(data);
    const result = yield bicycle_model_1.default.create(zodParsedData);
    return result;
});
const getBicycles = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, brand, type } = req.query;
        const filter = {};
        if (name)
            filter.name = { $regex: name, $options: 'i' };
        else if (brand)
            filter.brand = { $regex: brand, $options: 'i' };
        else if (type)
            filter.type = { $regex: type, $options: 'i' };
        else
            throw new utils_error_1.CustomError("Search key must be -> 'name', 'brand', 'type'", 'Invalid Api Structure Entered', 404, {
                name,
                brand,
                type,
            });
        const bicycles = yield bicycle_model_1.default.find(filter);
        return bicycles;
    }
    catch (error) {
        throw new utils_error_1.CustomError('Data Retrieved Failed!', 'ValidationError', 500, error);
    }
});
const getBicyclesById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.default.findById(productId);
    if (!result)
        throw new utils_error_1.CustomError(`Bicycle with id = '${productId}' doesn't exists!`, 'Invalid Id', 404, productId);
    else
        return result;
});
const updateBicycleById = (productId, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
updateBody) => __awaiter(void 0, void 0, void 0, function* () {
    const bicycle = yield bicycle_model_1.default.findById(productId);
    if (!bicycle)
        throw new utils_error_1.CustomError(`Bicycle with id = '${productId}' doesn't exists!`, 'Invalid Id', 404, productId);
    Object.assign(bicycle, updateBody);
    const result = yield bicycle.save();
    return result;
});
const deleteBicycleById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.default.findByIdAndDelete(productId);
    return result;
});
exports.userService = {
    createBicycle,
    getBicycles,
    getBicyclesById,
    updateBicycleById,
    deleteBicycleById,
};
