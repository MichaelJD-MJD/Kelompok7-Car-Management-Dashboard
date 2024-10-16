const express = require("express");

const carsRouter = require("./cars.routes");
const manufactureRouter = require("./manufacture.routes");
const typesRouter = require("./types.routes");

const router = express.Router();

router.use("/cars", carsRouter );
router.use("/manufacture", manufactureRouter );
router.use("/types", typesRouter );

module.exports = router;
