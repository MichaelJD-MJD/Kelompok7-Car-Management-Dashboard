const { successResponse } = require("../utils/response");
const typeService = require("../services/types.services");

exports.getTypes = async (req, res, next) => {
  // Call the usecase or service
  const data = await typeService.getTypes(req.query?.type);
  successResponse(res, data);
};

exports.getTypeById = async (req, res, next) => {
  const { id } = req.params;

  const data = await typeService.getTypeById(id);
  successResponse(res, data);
};

exports.createType = async (req, res, next) => {
  // Create the new Type
  const data = await typeService.createType(req.body);
  successResponse(res, data);
};

exports.updateType = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await typeService.updateType(id, req.body, req.files);
  successResponse(res, data);
};

exports.deleteTypeById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await typeService.deleteTypeById(id);
  successResponse(res, data);
};
