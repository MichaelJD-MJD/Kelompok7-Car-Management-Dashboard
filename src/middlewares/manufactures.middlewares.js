const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetAll = (req, res, next) => {
    const schema = z.object({
        name: z.string().optional(),
        establisment: z.string().optional(),
        country: z.string().optional(),
    });

    try {
        schema.parse(req.query);
        next();
    } catch (error) {
        throw new BadRequestError(error.errors);
    }
};

exports.validateGetById = (req, res, next) => {
    const schema = z.object({
        id: z.string(),
    });

    try {
        schema.parse(req.params);
        next();
    } catch (error) {
        throw new BadRequestError(error.errors);
    }
};

exports.validateCreate = (req, res, next) => {
    req.body = {
        ...req.body,
        establishment: parseInt(req.body.establishment),
    };

    const schema = z.object({
        name: z.string(),
        description: z.string().optional(),
        establishment: z.number().int(),
        office: z.string().optional(),
        country: z.string(),
    });

    const requiredFields = ["name", "establishment", "country"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        throw new BadRequestError(
            `Missing required fields: ${missingFields.join(", ")}`
        );
    }

    const fileSchema = z
        .object({
            logo: z
                .object({
                    name: z.string(),
                    data: z.any(),
                })
                .optional()
                .nullable(),
        })
        .optional()
        .nullable();

    try {
        schema.safeParse(req.body);
        fileSchema.safeParse(req.files);
        next();
    } catch (error) {
        throw new BadRequestError(error.errors);
    }
};

exports.validateUpdate = (req, res, next) => {
    const schema = z.object({
        id: z.string(),
    });

    req.body = {
        ...req.body,
        establishment: parseInt(req.body.establishment),
    };

    const bodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        establishment: z.number().int().optional(),
        office: z.string().optional(),
        country: z.string().optional(),
    });

    const fileSchema = z
        .object({
            logo: z
                .object({
                    name: z.string(),
                    data: z.any(),
                })
                .optional()
                .nullable(),
        })
        .optional()
        .nullable();
    try {
        schema.parse(req.params);
        bodySchema.parse(req.body);
        fileSchema.parse(req.files);
        next();
    } catch (error) {
        throw new BadRequestError(error.errors);
    }
};

exports.validateDelete = (req, res, next) => {
    const schema = z.object({
        id: z.string(),
    });

    try {
        schema.parse(req.params);
        next();
    } catch (error) {
        throw new BadRequestError(error.errors);
    }
};
