const carRepository = require("../repositories/cars.repositories");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = async (
  plate,
  manufacture_id,
  model,
  rentPerDay,
  capacity,
  transmission,
  available,
  type_id,
  year
) => {
  const cars = await carRepository.getCars(
    plate,
    manufacture_id,
    model,
    rentPerDay,
    capacity,
    transmission,
    available,
    type_id,
    year
  );
  if (cars.length == 0) {
    throw new NotFoundError("Cars is Not Found!");
  }

  return cars;
};

exports.getCarById = async (id) => {
  const car = await carRepository.getCarById(id);
  if (!car) {
    throw new NotFoundError("Cars is Not Found!");
  }

  return car;
};

exports.createCar = async (data, file) => {
//   // upload file to image kit
//   if (file?.profile_picture) {
//     data.profile_picture = await imageUpload(file.profile_picture);
//   }

//   return studentRepository.createStudent(data);
};

exports.updateCar = async (id, data, file) => {
//   // cek apakah ada file yng diupload
//   if (file?.profile_picture) {
//     data.profile_picture = await imageUpload(file.profile_picture);
//   }

//   // find student is exist or not (validate the data)
//   const existingStudent = await studentRepository.getStudentById(id);
//   if (!existingStudent) {
//     throw new NotFoundError("Student is Not Found!");
//   }

//   // if exist, we will delete the student data
//   const updatedStudent = await studentRepository.updateStudent(id, data);
//   if (!updatedStudent) {
//     throw new InternalServerError(["Failed to update student!"]);
//   }

//   return updatedStudent;
};

exports.deleteCarById = async (id) => {
//   // find student is exist or not (validate the data)
//   const existingStudent = await studentRepository.getStudentById(id);
//   if (!existingStudent) {
//     throw new NotFoundError("Student is Not Found!");
//   }

//   // if exist, we will delete the student data
//   const deletedStudent = await studentRepository.deleteStudentById(id);
//   if (!deletedStudent) {
//     throw new InternalServerError(["Failed to delete student!"]);
//   }

//   return deletedStudent;
};
