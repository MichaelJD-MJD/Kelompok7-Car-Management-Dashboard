const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getTypes = async (type) => {
  const searchedTypes = await prisma.types.findMany({
    where: {
      OR: [{ type: { contains: type, mode: "insensitive" } }],
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedTypes = JSONBigInt.stringify(searchedTypes);
  return JSONBigInt.parse(serializedTypes);
};

exports.getTypeById = async (id) => {
  // find type by id
  const type = await prisma.types.findFirst({
    where: {
      id: id,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedTypes = JSONBigInt.stringify(type);
  return JSONBigInt.parse(serializedTypes);
};

exports.createType = async (data) => {
  const newType = await prisma.types.create({
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedTypes = JSONBigInt.stringify(newType);
  return JSONBigInt.parse(serializedTypes);
};

exports.updateType = async (id, data) => {
  const updatedType = await prisma.types.update({
    where: { id },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedType = JSONBigInt.stringify(updatedType);
  return JSONBigInt.parse(serializedType);
};

exports.deleteTypeById = async (id) => {
  const deletedType = await prisma.types.delete({
    where: { id },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedTypes = JSONBigInt.stringify(deletedType);
  return JSONBigInt.parse(serializedTypes);
};
