import { Router } from 'express';
import { bicycleController } from './bicycle.controller';

const bicycleRouter = Router();

bicycleRouter.post('/', bicycleController.createBicycle);
bicycleRouter.get('/', bicycleController.getBicycles);

export default bicycleRouter;
