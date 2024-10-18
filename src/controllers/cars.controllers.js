const carService = require("../services/cars.services");
const { successResponse } = require("../utils/response");

exports.getCars = async (req, res, next) => {
    const data = await carService.getCars(req.query);
    successResponse(res, data);
};

exports.getCarById = async (req, res, next) => {
    const { id } = req.params;
    const data = await carService.getCarById(id);
    successResponse(res, data);
};

exports.createCar = async (req, res, next) => {
    const data = await carService.createCar(req.body, req.files);
    successResponse(res, data);
};

exports.updateCar = async (req, res, next) => {
    const { id } = req.params;
    const data = await carService.updateCar(id, req.body, req.files);
    successResponse(res, data);
};

exports.deleteCarById = async (req, res, next) => {
    const { id } = req.params;
    const data = await carService.deleteCarById(id);
    successResponse(res, data);
};
