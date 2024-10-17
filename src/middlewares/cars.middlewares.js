const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  // Validate the query
  const validateQuery = z.object({
    plate: z.string().optional(),
    manufacture_id: z.string().optional(),
    model: z.string().optional(),
    rentPerDay: z.number().optional(),
    capacity: z.string().optional(),
    trasmission: z.string().optional(),
    available: z.boolean().optional(),
    type_id: z.string().optional(),
    year: z.number().optional(),
  });

//   const validateQuery = z.object({
//     name: z.string(),
//     nickname: z.string().optional(),
//     bachelor: z.string().optional(),
//   });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetCarById = (req, res, next) => {
//   Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreateCar = (req, res, next) => {
  // Validation body schema
//   const validateBody = z.object({
//     name: z.string(),
//     nick_name: z.string().optional().nullable(),
//     class: z.string().optional().nullable(),
//     "address.city": z.string().optional().nullable(),
//     "address.province": z.string().optional().nullable(),
//     "education.bachelor": z.string().optional().nullable(),
//   });

//   const validateFileBody = z
//     .object({
//       profile_picture: z
//         .object({
//           name: z.string(),
//           data: z.any(),
//         })
//         .nullable()
//         .optional(),
//     })
//     .nullable()
//     .optional();

//   // Validate
//   const result = validateBody.safeParse(req.body);
//   if (!result.success) {
//     // If validation fails, return error messages
//     throw new BadRequestError(result.error.errors);
//   }

//   const resultValidateFiles = validateFileBody.safeParse(req.files);
//   if (!resultValidateFiles.success) {
//     // If validation fails, return error messages
//     throw new BadRequestError(result.error.errors);
//   }

//   next();
};

exports.validateUpdateCar = (req, res, next) => {
  // zod validation
//   const validateParams = z.object({
//     id: z.string(),
//   });

//   const validateFileBody = z
//     .object({
//       profile_picture: z
//         .object({
//           name: z.string(),
//           data: z.any(),
//         })
//         .nullable()
//         .optional(),
//     })
//     .nullable()
//     .optional();

//   const resultValidateParams = validateParams.safeParse(req.params);
//   if (!resultValidateParams.success) {
//     // If validation fails, return error messages
//     throw new BadRequestError(result.error.errors);
//   }

//   const resultValidateFiles = validateFileBody.safeParse(req.files);
//   if (!resultValidateFiles.success) {
//     // If validation fails, return error messages
//     throw new BadRequestError(result.error.errors);
//   }

//   // Validation body schema
//   const validateBody = z.object({
//     name: z.string(),
//     nick_name: z.string().optional().nullable(),
//     class: z.string().optional().nullable(),
//     "address.city": z.string().optional().nullable(),
//     "address.province": z.string().optional().nullable(),
//     "education.bachelor": z.string().optional().nullable(),
//   });

//   // Validate
//   const resultValidateBody = validateBody.safeParse(req.body);
//   if (!resultValidateBody.success) {
//     // If validation fails, return error messages
//     throw new BadRequestError(result.error.errors);
//   }

//   next();
};

exports.validateDeleteCarById = (req, res, next) => {
  // Make a validation schema
//   const validateParams = z.object({
//     id: z.string(),
//   });

//   const result = validateParams.safeParse(req.params);
//   if (!result.success) {
//     // If validation fails, return error messages
//     throw new BadRequestError(result.error.errors);
//   }

//   next();
};
