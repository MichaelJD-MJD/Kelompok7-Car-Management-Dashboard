const { boolean } = require("zod");
const carRepository = require("../repositories/cars.repositories");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

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
  const cars = await carRepository.getCars(
    plate,
    manufacture_id,
    model,
    rentPerDay,
    capacity,
    transmission,
    available,
    type_id,
    year
  );
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
  // upload file to image kit
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }

  data.rentPerDay = Number(data.rentPerDay);
  data.capacity = Number(data.capacity);
  const availableString = data.available.toLowerCase();
  data.available = availableString === "true";
  data.year = Number(data.year);
  data.options ?  JSON.parse(data.options) : null;
  data.specs ? JSON.parse(data.specs) : null;

  return carRepository.createCar(data);
};

exports.updateCar = async (id, data, file) => {
  // cek apakah ada file yng diupload
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }

  // find car is exist or not (validate the data)
  const existingCar = await carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  data.rentPerDay = Number(data.rentPerDay);
  data.capacity = Number(data.capacity);
  const availableString = data.available.toLowerCase();
  data.available = availableString === "true";
  data.year = Number(data.year);
  data.options ? JSON.parse(data.options) : null;
  data.specs ? JSON.parse(data.specs) : null;

  // if exist, we will delete the car data
  const updatedCar = await carRepository.updateCar(id, data);
  if (!updatedCar) {
    throw new InternalServerError(["Failed to update Car!"]);
  }

  return updatedCar;
};

exports.deleteCarById = async (id) => {
  // find car is exist or not (validate the data)
  const existingCar = await carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  // if exist, we will delete the Car data
  const deletedCar = await carRepository.deleteCarById(id);
  if (!deletedCar) {
    throw new InternalServerError(["Failed to delete Car!"]);
  }

  return deletedCar;
};
