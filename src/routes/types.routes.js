const express = require("express");
const {
  validateGetTypes,
  validateGetTypeById,
  validateDeleteTypeById,
  validateCreateType,
  validateUpdateType,
} = require("../middlewares/types.middlewares");
const {
  getTypes,
  getTypeById,
  deleteTypeById,
  createType,
  updateType,
} = require("../controllers/types.controllers");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetTypes, getTypes)
  .post(validateCreateType, createType);

router
  .route("/:id")
  .get(validateGetTypeById, getTypeById)
  .put(validateUpdateType, updateType)
  .delete(validateDeleteTypeById, deleteTypeById);

module.exports = router;
