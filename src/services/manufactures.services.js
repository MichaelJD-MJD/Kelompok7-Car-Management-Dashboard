const manufacturesRepository = require("../repositories/manufactures.repositories");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getAll = async (name, establisment, country) => {
    const searched = await manufacturesRepository.getAll(
        name,
        establisment,
        country
    );
    if (searched.length === 0) {
        throw new NotFoundError("Manufacture not found");
    }
    return searched;
};

exports.getById = async (id) => {
    const searched = await manufacturesRepository.getById(id);
    if (!searched) {
        throw new NotFoundError("Manufacture not found");
    }
    return searched;
};

exports.create = async (data, file) => {
    if (file?.logo) {
        data.logo = await imageUpload(file.logo);
        if (!data.logo) {
            throw new InternalServerError("Failed to upload image");
        }
    }
    const created = await manufacturesRepository.create({ ...data });
    if (!created) {
        throw new InternalServerError("Failed to create manufacture");
    }
    return created;
};

exports.update = async (id, data, file) => {
    const existing = await manufacturesRepository.getById(id);
    if (!existing) {
        throw new NotFoundError("Manufacture not found");
    }

    if (file?.logo) {
        data.logo = await imageUpload(file.logo);
        if (!data.logo) {
            throw new InternalServerError("Failed to upload image");
        }
    }

    const updated = await manufacturesRepository.update(id, { ...data });
    if (!updated) {
        throw new InternalServerError("Failed to update manufacture");
    }
    return updated;
};

exports.delete = async (id) => {
    const existing = await manufacturesRepository.getById(id);
    if (!existing) {
        throw new NotFoundError("Manufacture not found");
    }

    const deleted = await manufacturesRepository.delete(id);
    if (!deleted) {
        throw new InternalServerError("Failed to delete manufacture");
    }
    return deleted;
};
