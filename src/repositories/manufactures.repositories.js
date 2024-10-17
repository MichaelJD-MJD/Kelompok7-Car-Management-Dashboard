const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getAll = async (name, establisment, country) => {
    let query = {};
    let orQuery = [];
    if ((name, establisment, country)) {
        orQuery.push({
            name: {
                contains: name,
                // mode: "insensitive",
            },
        });
        orQuery.push({
            establishment: {
                contains: establisment,
                // mode: "insensitive",
            },
        });
        orQuery.push({
            country: {
                contains: country,
                // mode: "insensitive",
            },
        });
    }
    if (orQuery.length > 0) {
        query.where = {
            ...query.where,
            OR: orQuery,
        };
    }

    const searched = await prisma.manufactures.findMany(query);

    return (serialize = JSONBigInt.parse(JSONBigInt.stringify(searched)));
};

exports.getById = async (id) => {
    const searchedById = await prisma.manufactures.findFirst({
        where: {
            id: id,
        },
    });

    return (serialize = JSONBigInt.parse(JSONBigInt.stringify(searchedById)));
};

exports.create = async (data) => {
    const maxId = await prisma.manufactures.findFirst({
        orderBy: {
            id: "desc",
        },
    });

    const serializeMaxId = JSONBigInt.parse(JSONBigInt.stringify(maxId));
    const newId = serializeMaxId ? serializeMaxId.id + 1 : 1;

    const created = await prisma.manufactures.create({
        data: {
            id: newId,
            ...data,
        },
    });

    return (serialize = JSONBigInt.parse(JSONBigInt.stringify(created)));
};

exports.update = async (id, data) => {
    const updated = await prisma.manufactures.update({
        where: {
            id: id,
        },
        data: {
            ...data,
        },
    });

    return (serialize = JSONBigInt.parse(JSONBigInt.stringify(updated)));
};

exports.delete = async (id) => {
    const deleted = await prisma.manufactures.delete({
        where: {
            id: id,
        },
    });

    return (serialize = JSONBigInt.parse(JSONBigInt.stringify(deleted)));
};