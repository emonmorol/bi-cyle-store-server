import { Router } from 'express';
import { bicycleController } from './bicycle.controller';

const bicycleRouter = Router();

bicycleRouter.post('/', bicycleController.createBicycle);
bicycleRouter.get('/', bicycleController.getBicycles);
bicycleRouter.get('/:productId', bicycleController.getBicycleById);
bicycleRouter.put('/:productId', bicycleController.updateBicycleById);
bicycleRouter.delete('/:productId', bicycleController.deleteBicycleById);

export default bicycleRouter;
