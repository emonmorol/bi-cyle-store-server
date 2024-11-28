import Bicycle from './bicycle.model';
import { TBicycle } from './bicycle.interface';
import bicycleValidationSchema from './bicycle.zod.validation';

const createBicycle = async (data: TBicycle): Promise<TBicycle> => {
    const zodParsedData = await bicycleValidationSchema.parseAsync(data);
    const result: TBicycle = await Bicycle.create(zodParsedData);
    return result;
};

const getBicycles = async (req: Request): Promise<TBicycle[]> => {
    const { name, brand, type } = req.query;

    const filter: Record<string, unknown> = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    else if (brand) filter.brand = { $regex: brand, $options: 'i' };
    else if (type) filter.type = { $regex: type, $options: 'i' };
    else
        throw new Error("Search key must be -> 'name', 'brand', 'type' ").stack;

    const bicycles: TBicycle[] = await Bicycle.find(filter);

    return bicycles;
};

const getBicyclesById = async (productId: string): Promise<TBicycle> => {
    const result: TBicycle | null = await Bicycle.findById(productId);

    if (!result)
        throw new Error(`User with id = ${productId} doesn't exists!`).stack;
    else return result;
};

const updateBicycleById = async (
    productId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateBody: any,
): Promise<TBicycle | undefined> => {
    const bicycle = await Bicycle.findById(productId);

    if (!bicycle)
        throw new Error(`User with id = ${productId} doesn't exists!`).stack;

    Object.assign(bicycle, updateBody);

    const result = await bicycle.save();
    return result;
};

const deleteBicycleById = async (
    productId: string,
): Promise<TBicycle | null> => {
    const result: TBicycle | null = await Bicycle.findByIdAndDelete(productId);

    return result;
};

export const userService = {
    createBicycle,
    getBicycles,
    getBicyclesById,
    updateBicycleById,
    deleteBicycleById,
};
