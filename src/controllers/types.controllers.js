const { successResponse } = require("../utils/response");
const typeService = require("../services/types.services");

exports.getTypes = async (req, res, next) => {
  // Call the usecase or service
  try {
    // Jika query parameter type tidak ada, biarkan undefined atau null
    const type = req.query?.type || null;

    // Panggil service
    const data = await typeService.getTypes(type);

    // Respon sukses
    successResponse(res, data);
  } catch (error) {
    next(error); // Tangani error jika ada
  }
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
  const { id } = req.params;
  const data = await typeService.updateType(id, req.body, req.files);
  successResponse(res, data);
};

exports.deleteTypeById = async (req, res, next) => {
  const { id } = req.params;
  const data = await typeService.deleteTypeById(id);
  successResponse(res, data);
};
