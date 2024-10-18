const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getCars = async (query) => {
  let searchedCar = await prisma.cars.findMany();
  if (Object.keys(query).length > 0) {
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
            plate: plate ? { contains: plate, mode: "insensitive" } : undefined,
          },
          {
            model: model ? { contains: model, mode: "insensitive" } : undefined,
          },
          {
            transmission: transmission
              ? { contains: transmission, mode: "insensitive" }
              : undefined,
          },
          { rentPerDay: rentPerDay ? { equals: rentPerDay } : undefined }, // Correct for integer
          { capacity: capacity ? { equals: capacity } : undefined }, // Correct for integer
          {
            available:
              available !== undefined ? { equals: available } : undefined,
          }, // Correct for boolean
          {
            manufacture_id: manufacture_id
              ? { equals: manufacture_id }
              : undefined,
          }, // Correct for integer
          { type_id: type_id ? { equals: type_id } : undefined }, // Correct for integer
          { year: year ? { equals: year } : undefined }, // Correct for integer
        ].filter(Boolean), // Removes undefined fields
      },
      include: {
        manufactures: true,
        types: true,
      },
    });
  }

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(searchedCar);
  return JSONBigInt.parse(serializedCars);
};

exports.getCarById = async (id) => {
  // find car by id
  const car = await prisma.cars.findFirst({
    where: {
      id: id,
    },
  });
  // Convert BigInt fields to string for safe serialization
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

  return newCar;
};

exports.updateCar = async (id, data) => {
  // ambil data lama
  const car = await this.getCarById(id);

  const updateCar = await prisma.cars.update({
    where: {
      // filter
      id: id,
    },
    data: {
      ...car,
      ...data,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(updateCar);
  return JSONBigInt.parse(serializedCars);
};

exports.deleteCarById = async (id) => {
  const deletedCar = await prisma.cars.delete({
    where: {
      id: id,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(deletedCar);
  return JSONBigInt.parse(serializedCars);
};
