import Bicycle from './bicycle.model';
import { TBicycle } from './bicycle.interface';
import bicycleValidationSchema from './bicycle.zod.validation';
import { Request } from 'express';
import { CustomError } from '../../utils/errors/utils.error';

const createBicycle = async (data: TBicycle): Promise<TBicycle> => {
    const zodParsedData = await bicycleValidationSchema.parseAsync(data);
    const result: TBicycle = await Bicycle.create(zodParsedData);
    return result;
};

const getBicycles = async (req: Request): Promise<TBicycle[]> => {
    try {
        const { name, brand, type } = req.query;

        const filter: Record<string, unknown> = {};

        if (name) filter.name = { $regex: name, $options: 'i' };
        else if (brand) filter.brand = { $regex: brand, $options: 'i' };
        else if (type) filter.type = { $regex: type, $options: 'i' };
        else
            throw new CustomError(
                "Search key must be -> 'name', 'brand', 'type'",
                'Invalid Api Structure Entered',
                404,
                {
                    name,
                    brand,
                    type,
                },
            );

        const bicycles: TBicycle[] = await Bicycle.find(filter);

        return bicycles;
    } catch (error) {
        throw new CustomError(
            'Data Retrieved Failed!',
            'ValidationError',
            500,
            error,
        );
    }
};

const getBicyclesById = async (productId: string): Promise<TBicycle> => {
    const result: TBicycle | null = await Bicycle.findById(productId);

    if (!result)
        throw new CustomError(
            `Bicycle with id = '${productId}' doesn't exists!`,
            'Invalid Id',
            404,
            productId,
        );
    else return result;
};

const updateBicycleById = async (
    productId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateBody: any,
): Promise<TBicycle | undefined> => {
    const bicycle = await Bicycle.findById(productId);

    if (!bicycle)
        throw new CustomError(
            `Bicycle with id = '${productId}' doesn't exists!`,
            'Invalid Id',
            404,
            productId,
        );

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
