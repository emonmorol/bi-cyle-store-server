import Bicycle from './bicycle.model';
import bicycleValidationSchema from './bicycle.zod.validation';
import { TBicycle } from './bicycle.interface';

const createBicycle = async (data: TBicycle): Promise<TBicycle> => {
    const zodParsedData = await bicycleValidationSchema.parseAsync(data);

    const result = await Bicycle.create(zodParsedData);

    return result;
};



export const userService = {
    createBicycle,
};
