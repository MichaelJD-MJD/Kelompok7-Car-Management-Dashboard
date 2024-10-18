const { successResponse } = require("../utils/response");
const typeService = require("../services/types.services");

exports.getTypes = async (req, res, next) => {
    try {
        const type = req.query?.type || null;
        const data = await typeService.getTypes(type);
        successResponse(res, data);
    } catch (error) {
        next(error);
    }
};

exports.getTypeById = async (req, res, next) => {
    const { id } = req.params;
    const data = await typeService.getTypeById(id);
    successResponse(res, data);
};

exports.createType = async (req, res, next) => {
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
