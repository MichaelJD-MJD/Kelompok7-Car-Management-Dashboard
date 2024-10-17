const typeRepository = require("../repositories/types.repositories");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getTypes = async (type) => {
  return typeRepository.getTypes(type);
};

exports.getTypeById = async (id) => {
  const type = await typeRepository.getTypeById(id);

  if (!type) {
    throw new NotFoundError("Car Type is Not Found!");
  }

  return type;
};

exports.createType = async (data) => {
  // Create the data
  return typeRepository.createType(data);
};

exports.updateType = async (id, data, file) => {
  // find type is exist or not (validate the data)
  const existingType = typeRepository.getTypeById(id);
  if (!existingType) {
    throw new NotFoundError("Car Type is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingType, // existing Type
    ...data,
  };
  // if exist, we will update the type data
  const updatedType = typeRepository.updateType(id, data);
  if (!updatedType) {
    throw new InternalServerError(["Failed to update Car Type!"]);
  }

  return updatedType;
};

exports.deleteTypeById = async (id) => {
  // find type is exist or not (validate the data)
  const existingType = await typeRepository.getTypeById(id);
  if (!existingType) {
    throw new NotFoundError("car type is Not Found!");
  }

  // if exist, we will delete the type data
  const deletedType = await typeRepository.deleteTypeById(id);
  if (!deletedType) {
    throw new InternalServerError(["Failed to delete car type!"]);
  }

  return deletedType;
};
