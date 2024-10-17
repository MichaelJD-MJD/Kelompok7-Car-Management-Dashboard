const manufacturesServices = require("../services/manufactures.services");
const { successResponse } = require("../utils/response");

exports.getAll = async (req, res) => {
    const { name, establisment, country } = req.query;
    const data = await manufacturesServices.getAll(name, establisment, country);
    successResponse(res, data);
};

exports.getById = async (req, res) => {
    const { id } = req.params;
    const data = await manufacturesServices.getById(id);
    successResponse(res, data);
};

exports.create = async (req, res) => {
    const { body, files } = req;
    const data = await manufacturesServices.create(body, files);
    successResponse(res, data, 201);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { body, files } = req;
    const data = await manufacturesServices.update(id, body, files);
    successResponse(res, data);
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    const data = await manufacturesServices.delete(id);
    successResponse(res, data);
};
