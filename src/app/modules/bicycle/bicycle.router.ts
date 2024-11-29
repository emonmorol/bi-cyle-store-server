import { Router } from 'express';
import { bicycleController } from './bicycle.controller';

const bicycleRouter = Router();

bicycleRouter.post('/', bicycleController.createBicycle); // Post A single bicycle
bicycleRouter.get('/', bicycleController.getBicycles); // Get an array of bicycle
bicycleRouter.get('/:productId', bicycleController.getBicycleById); // Get a single bicycle using ID
bicycleRouter.put('/:productId', bicycleController.updateBicycleById); // Update A single bicycle using ID
bicycleRouter.delete('/:productId', bicycleController.deleteBicycleById); // Delete a bicycle using ID

export default bicycleRouter;
