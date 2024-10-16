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
    const schema = z.object({
        name: z.string(),
        description: z.string().optional(),
        establisment: z.string(),
        office: z.string().optional(),
        country: z.string(),
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
        .oprional()
        .nullable();
    try {
        schema.parse(req.body);
        fileSchema.parse(req.file);
        next();
    } catch (error) {
        throw new BadRequestError(error.errors);
    }
};

exports.validateUpdate = (req, res, next) => {
    const schema = z.object({
        id: z.string(),
    });

    const bodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        establisment: z.string().optional(),
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
        .oprional()
        .nullable();
    try {
        schema.parse(req.params);
        bodySchema.parse(req.body);
        fileSchema.parse(req.file);
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
