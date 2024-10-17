const carService = require("../services/cars.services");
const { successResponse } = require("../utils/response");

exports.getCars = async (req, res, next) => {
  // Call the usecase or service
  const data = await carService.getCars(
    req.query?.plate,
    req.query?.manufacture_id,
    req.query?.model,
    req.query?.rentPerDay,
    req.query?.capacity,
    req.query?.transmission,
    req.query?.available,
    req.query?.type_id,
    req.query?.year,
  );

  successResponse(res, data);
};

exports.getCarById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await carService.getCarById(id);
  successResponse(res, data);
};

exports.createCar = async (req, res, next) => {
  const data = await carService.createCar(req.body, req.files);
  successResponse(res, data);
};

exports.updateCar = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await carService.updateCar(id, req.body, req.files);
  successResponse(res, data);
};

exports.deleteCarById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await carService.deleteCarById(id);
  successResponse(res, data);
};
