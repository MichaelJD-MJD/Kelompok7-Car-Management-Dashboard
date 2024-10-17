const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

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
//   const students = await prisma.students.findMany();

//   // Find the max index to defnine the new data id
//   let maxId = students.reduce(
//     (max, student) => student.id > max && student.id,
//     0
//   );
//   maxId = Number(maxId);

//   const newStudent = {
//     id: JSONBigInt.parse(maxId + 1),
//     ...data,
//   };

//   const createStudent = await prisma.students.create({
//     data: newStudent,
//   });

//   return newStudent;
};

exports.updateCar = async (id, data) => {
//   const updateStudent = await prisma.students.update({
//     where: {
//       // filter
//       id: id,
//     },
//     data: {
//       ...data,
//     },
//   });

//   // Convert BigInt fields to string for safe serialization
//   const serializedStudents = JSONBigInt.stringify(updateStudent);
//   return JSONBigInt.parse(serializedStudents);
};

exports.deleteCarById = async (id) => {
//   const deletedStudent = await prisma.students.delete({
//     where: {
//       id: id,
//     },
//   });

//   // Convert BigInt fields to string for safe serialization
//   const serializedStudents = JSONBigInt.stringify(deletedStudent);
//   return JSONBigInt.parse(serializedStudents);
};
