const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getCars = async (query) => {
    let searchedCar;

    if (Object.keys(query).length === 0) {
        searchedCar = await prisma.cars.findMany({
            include: {
                manufactures: true,
                types: true,
            },
        });
    } else {
        const {
            plate,
            manufacture_id,
            model,
            rentPerDay,
            capacity,
            transmission,
            available,
            type_id,
            year,
        } = query;

        searchedCar = await prisma.cars.findMany({
            where: {
                OR: [
                    {
                        plate: plate
                            ? { contains: plate, mode: "insensitive" }
                            : undefined,
                    },
                    {
                        model: model
                            ? { contains: model, mode: "insensitive" }
                            : undefined,
                    },
                    {
                        transmission: transmission
                            ? { contains: transmission, mode: "insensitive" }
                            : undefined,
                    },
                    {
                        rentPerDay: rentPerDay
                            ? { equals: rentPerDay }
                            : undefined,
                    },
                    { capacity: capacity ? { equals: capacity } : undefined },
                    {
                        available:
                            available !== undefined
                                ? { equals: available }
                                : undefined,
                    },
                    {
                        manufacture_id: manufacture_id
                            ? { equals: manufacture_id }
                            : undefined,
                    },
                    { type_id: type_id ? { equals: type_id } : undefined },
                    { year: year ? { equals: year } : undefined },
                ].filter(Boolean),
            },
            include: {
                manufactures: true,
                types: true,
            },
        });
    }

    const serializedCars = JSONBigInt.stringify(searchedCar);
    return JSONBigInt.parse(serializedCars);
};

exports.getCarById = async (id) => {
    const car = await prisma.cars.findFirst({
        where: {
            id: id,
        },
    });
    const serializedCars = JSONBigInt.stringify(car);
    return JSONBigInt.parse(serializedCars);
};

exports.createCar = async (data) => {
    const maxId = await prisma.cars.findFirst({
        orderBy: {
            id: "desc",
        },
    });

    const serializeMaxId = JSONBigInt.parse(JSONBigInt.stringify(maxId));
    const newId = serializeMaxId ? serializeMaxId.id + 1 : 1;

    const newCar = {
        id: newId,
        ...data,
    };

    const createCar = await prisma.cars.create({
        data: newCar,
    });

    const serializedCars = JSONBigInt.stringify(createCar);
    return JSONBigInt.parse(serializedCars);
};

exports.updateCar = async (id, data) => {
    const car = await this.getCarById(id);

    const updateCar = await prisma.cars.update({
        where: {
            id: id,
        },
        data: {
            ...car,
            ...data,
        },
    });

    const serializedCars = JSONBigInt.stringify(updateCar);
    return JSONBigInt.parse(serializedCars);
};

exports.deleteCarById = async (id) => {
    const deletedCar = await prisma.cars.delete({
        where: {
            id: id,
        },
    });

    const serializedCars = JSONBigInt.stringify(deletedCar);
    return JSONBigInt.parse(serializedCars);
};
