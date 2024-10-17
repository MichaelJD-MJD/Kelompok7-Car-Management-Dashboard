const express = require('express');
const {
    validateGetAll,
    validateGetById,
    validateCreate,
    validateUpdate,
    validateDelete,
} = require('../middlewares/manufactures.middlewares');
const {
    getAll,
    getById,
    create,
    update,
    delete: deleteManufacture,
} = require('../controllers/manufactures.controllers');

const router = express.Router();

router
    .route('/')
    .get(validateGetAll, getAll)
    .post(validateCreate, create);

router
    .route('/:id')
    .get(validateGetById, getById)
    .put(validateUpdate, update)
    .delete(validateDelete, deleteManufacture);

module.exports = router;
