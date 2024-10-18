const carRepository = require("../repositories/cars.repositories");
const manufacturesRepository = require("../repositories/manufactures.repositories");
const typesRepository = require("../repositories/types.repositories");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = async (query) => {
    const cars = await carRepository.getCars(query);
    if (cars.length == 0) {
        throw new NotFoundError("Cars is Not Found!");
    }

    return cars;
};

exports.getCarById = async (id) => {
    const car = await carRepository.getCarById(id);
    if (!car) {
        throw new NotFoundError("Cars is Not Found!");
    }

    return car;
};

exports.createCar = async (data, file) => {
    if (file?.image) {
        data.image = await imageUpload(file.image);
    }

    const manufactureExists = await manufacturesRepository.getById(
        data.manufacture_id
    );
    if (!manufactureExists) {
        throw new NotFoundError("Manufacture ID is Not Found");
    }

    const typeExists = await typesRepository.getTypeById(data.types_id);
    if (!typeExists) {
        throw new NotFoundError("Type ID is Not Found");
    }

    data.rentPerDay = Number(data.rentPerDay);
    data.capacity = Number(data.capacity);
    const availableString = data.available.toLowerCase();
    data.available = availableString === "true";
    data.year = Number(data.year);
    data.options ? JSON.stringify(data.options) : null;
    data.specs ? JSON.stringify(data.specs) : null;

    return carRepository.createCar(data);
};

exports.updateCar = async (id, data, file) => {
    if (file?.image) {
        data.image = await imageUpload(file.image);
    }

    const existingCar = await carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    const manufactureExists = await manufacturesRepository.getById(
        data.manufacture_id
    );
    if (!manufactureExists) {
        throw new NotFoundError("Manufacture ID is Not Found");
    }

    const typeExists = await typesRepository.getTypeById(data.types_id);
    if (!typeExists) {
        throw new NotFoundError("Type ID is Not Found");
    }

    data.rentPerDay = Number(data.rentPerDay);
    data.capacity = Number(data.capacity);
    const availableString = data.available.toLowerCase();
    data.available = availableString === "true";
    data.year = Number(data.year);
    data.options ? JSON.stringify(data.options) : null;
    data.specs ? JSON.stringify(data.specs) : null;

    const updatedCar = await carRepository.updateCar(id, data);
    if (!updatedCar) {
        throw new InternalServerError(["Failed to update Car!"]);
    }

    return updatedCar;
};

exports.deleteCarById = async (id) => {
    const existingCar = await carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    const deletedCar = await carRepository.deleteCarById(id);
    if (!deletedCar) {
        throw new InternalServerError(["Failed to delete Car!"]);
    }

    return deletedCar;
};
