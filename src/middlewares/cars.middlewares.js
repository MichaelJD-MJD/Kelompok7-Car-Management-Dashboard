const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        const validateQuery = z.object({
            plate: z.string().nullable().optional(),
            manufacture_id: z.string().nullable().optional(),
            model: z.string().nullable().optional(),
            rentPerDay: z.coerce.number().nullable().optional(),
            capacity: z.coerce.number().nullable().optional(),
            description: z.string().nullable().optional(),
            availableAt: z.string().nullable().optional(),
            trasmission: z.string().nullable().optional(),
            available: z.coerce.boolean().nullable().optional(),
            type_id: z.string().nullable().optional(),
            year: z.coerce.number().nullable().optional(),
        });

        const resultValidateQuery = validateQuery.safeParse(req.query);
        if (!resultValidateQuery.success) {
            throw new BadRequestError(resultValidateQuery.error.errors);
        }
    }
    next();
};

exports.validateGetCarById = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    }

    next();
};

exports.validateCreateCar = (req, res, next) => {
    // Validate the query
    const validateBody = z.object({
        plate: z.string(),
        manufacture_id: z.string(),
        model: z.string(),
        rentPerDay: z.coerce.number(),
        capacity: z.coerce.number(),
        description: z.string(),
        availableAt: z.string(),
        transmission: z.string(),
        available: z.coerce.boolean(),
        type_id: z.string(),
        year: z.coerce.number(),
        options: z.array(z.string()).nullable().optional(),
        specs: z.array(z.string()).nullable().optional(),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.errors);
    }

    const validateFileBody = z.object({
        image: z.object({
            name: z.string(),
            data: z.any(),
        }),
    });

    const resultValidateFiles = validateFileBody.safeParse(req.files);
    if (!resultValidateFiles.success) {
        throw new BadRequestError(resultValidateFiles.error.errors);
    }

    next();
};

exports.validateUpdateCar = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(result.error.errors);
    }

    const validateBody = z.object({
        plate: z.string(),
        manufacture_id: z.string(),
        model: z.string(),
        rentPerDay: z.coerce.number(),
        capacity: z.coerce.number(),
        description: z.string(),
        availableAt: z.string(),
        transmission: z.string(),
        available: z.coerce.boolean(),
        type_id: z.string(),
        year: z.coerce.number(),
        options: z.array(z.string()).nullable().optional(),
        specs: z.array(z.string()).nullable().optional(),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(result.error.errors);
    }

    const validateFileBody = z.object({
        image: z.object({
            name: z.string(),
            data: z.any(),
        }),
    });

    const resultValidateFiles = validateFileBody.safeParse(req.files);
    if (!resultValidateFiles.success) {
        throw new BadRequestError(resultValidateFiles.error.errors);
    }

    next();
};

exports.validateDeleteCarById = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    }

    next();
};
