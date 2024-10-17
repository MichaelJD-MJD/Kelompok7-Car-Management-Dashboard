const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");

const prisma = new PrismaClient();

exports.getCars = async (
  plate,
  manufacture_id,
  model,
  rentPerDay,
  capacity,
  transmission,
  available,
  type_id,
  year
) => {
  const searchedCar = await prisma.cars.findMany({
    where: {
      OR: [
        { plate: plate ? { contains: plate, mode: "insensitive" } : undefined },
        { model: model ? { contains: model, mode: "insensitive" } : undefined },
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

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(searchedCar);
  return JSONBigInt.parse(serializedCars);
};

exports.getCarById = async (id) => {
  // find student by id
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
  // Cek apakah manufacture_id ada di tabel manufactures
  const manufactureExists = await prisma.manufactures.findUnique({
    where: {
      id: data.manufacture_id,
    },
  });

  if (!manufactureExists) {
    throw new NotFoundError("Manufacture ID is Not Found");
  }

  // Cek apakah type_id ada di tabel types
  const typeExists = await prisma.types.findUnique({
    where: {
      id: data.type_id,
    },
  });

  if (!typeExists) {
    throw new NotFoundError("Type ID is Not Found");
  }

  const cars = await prisma.cars.findMany();
  // Find the max index to defnine the new data id
  let maxId = cars.reduce((max, car) => car.id > max && car.id, 0);
  maxId = Number(maxId);

  const newCar = {
    id: JSONBigInt.parse(maxId + 1),
    ...data,
  };

  const createCar = await prisma.cars.create({
    data: newCar,
  });

  return newCar;
};

exports.updateCar = async (id, data) => {
  // Cek apakah manufacture_id ada di tabel manufactures
  const manufactureExists = await prisma.manufactures.findUnique({
    where: {
      id: data.manufacture_id,
    },
  });

  if (!manufactureExists) {
    throw new NotFoundError("Manufacture ID is Not Found");
  }

  // Cek apakah type_id ada di tabel types
  const typeExists = await prisma.types.findUnique({
    where: {
      id: data.type_id,
    },
  });

  if (!typeExists) {
    throw new NotFoundError("Type ID is Not Found");
  }

  const updateCar = await prisma.cars.update({
    where: {
      // filter
      id: id,
    },
    data: {
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
