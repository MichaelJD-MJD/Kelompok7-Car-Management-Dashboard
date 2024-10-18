const typeRepository = require("../repositories/types.repositories");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getTypes = async (type) => {
    const types = await typeRepository.getTypes(type);
    if (types.length === 0) {
        throw new NotFoundError("Car Types are Not Found!");
    }
    return types;
};

exports.getTypeById = async (id) => {
    const type = await typeRepository.getTypeById(id);

    if (!type) {
        throw new NotFoundError("Car Type is Not Found!");
    }

    return type;
};

exports.createType = async (data) => {
    return typeRepository.createType(data);
};

exports.updateType = async (id, data, file) => {
    const existingType = typeRepository.getTypeById(id);
    if (!existingType) {
        throw new NotFoundError("Car Type is Not Found!");
    }

    data = {
        ...existingType,
        ...data,
    };
    const updatedType = typeRepository.updateType(id, data);
    if (!updatedType) {
        throw new InternalServerError(["Failed to update Car Type!"]);
    }

    return updatedType;
};

exports.deleteTypeById = async (id) => {
    const existingType = await typeRepository.getTypeById(id);
    if (!existingType) {
        throw new NotFoundError("car type is Not Found!");
    }

    const deletedType = await typeRepository.deleteTypeById(id);
    if (!deletedType) {
        throw new InternalServerError(["Failed to delete car type!"]);
    }

    return deletedType;
};
