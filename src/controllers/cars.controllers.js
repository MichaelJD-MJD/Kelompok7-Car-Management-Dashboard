const carService = require("../services/cars.services");
const { successResponse } = require("../utils/response");

exports.getCars = async (req, res, next) => {
  // Call the usecase or service
  const data = await carService.getCars(
    req.query?.plate,
    req.query?.manufacture_id,
    req.query?.model,
    req.query?.rentPerDay,
    req.query?.capacity,
    req.query?.transmission,
    req.query?.available,
    req.query?.type_id,
    req.query?.year,
  );

  successResponse(res, data);
};

exports.getCarById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await carService.getCarById(id);
  successResponse(res, data);
};

exports.createStudent = async (req, res, next) => {
  // convert to student data format
//   const requestBody = {
//     ...req.body,
//     address: {
//       province: req.body["address.province"],
//       city: req.body["address.city"],
//     },
//     eductaion: {
//       bachelor: req.body["eductaion.bachelor"],
//     },
//   };
//   delete requestBody["address.province"];
//   delete requestBody["address.city"];
//   delete requestBody["education.bachelor"];

//   const data = await studentService.createStudent(req.body, req.files);
//   successResponse(res, data);
};

exports.updateStudent = async (req, res, next) => {
//   const requestBody = {
//     ...req.body,
//     address: {
//       province: req.body["address.province"],
//       city: req.body["address.city"],
//     },
//     eductaion: {
//       bachelor: req.body["eductaion.bachelor"],
//     },
//   };
//   delete requestBody["address.province"];
//   delete requestBody["address.city"];
//   delete requestBody["education.bachelor"];

//   // Get the id from params
//   const { id } = req.params;
//   const data = await studentService.updateStudent(id, req.body, req.files);
//   successResponse(res, data);
};

exports.deleteStudentById = async (req, res, next) => {
//   // Get the id from params
//   const { id } = req.params;
//   const data = await studentService.deleteStudentById(id);
//   successResponse(res, data);
};
