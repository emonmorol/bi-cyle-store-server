"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bicycle_controller_1 = require("./bicycle.controller");
const bicycleRouter = (0, express_1.Router)();
bicycleRouter.post('/', bicycle_controller_1.bicycleController.createBicycle); // Post A single bicycle
bicycleRouter.get('/', bicycle_controller_1.bicycleController.getBicycles); // Get an array of bicycle
bicycleRouter.get('/:productId', bicycle_controller_1.bicycleController.getBicycleById); // Get a single bicycle using ID
bicycleRouter.put('/:productId', bicycle_controller_1.bicycleController.updateBicycleById); // Update A single bicycle using ID
bicycleRouter.delete('/:productId', bicycle_controller_1.bicycleController.deleteBicycleById); // Delete a bicycle using ID
exports.default = bicycleRouter;
