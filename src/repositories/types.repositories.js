const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getTypes = async (type) => {
    const searchedTypes = await prisma.types.findMany({
        where: type
            ? { OR: [{ type: { contains: type, mode: "insensitive" } }] }
            : {},
    });

    // Serialisasi data untuk menangani BigInt
    const serializedTypes = JSONBigInt.stringify(searchedTypes);
    return JSONBigInt.parse(serializedTypes);
};

exports.getTypeById = async (id) => {
    const type = await prisma.types.findFirst({
        where: {
            id: id,
        },
    });

    const serializedTypes = JSONBigInt.stringify(type);
    return JSONBigInt.parse(serializedTypes);
};

exports.createType = async (data) => {
    const newType = await prisma.types.create({
        data,
    });

    const serializedTypes = JSONBigInt.stringify(newType);
    return JSONBigInt.parse(serializedTypes);
};

exports.updateType = async (id, data) => {
    const updatedType = await prisma.types.update({
        where: { id },
        data,
    });

    const serializedType = JSONBigInt.stringify(updatedType);
    return JSONBigInt.parse(serializedType);
};

exports.deleteTypeById = async (id) => {
    const deletedType = await prisma.types.delete({
        where: { id },
    });

    const serializedTypes = JSONBigInt.stringify(deletedType);
    return JSONBigInt.parse(serializedTypes);
};
