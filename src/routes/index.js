const express = require("express");

// const carsRouter = require("./cars.routes");
const manufacturesRouter = require("./manufactures.routes");
// const typesRouter = require("./types.routes");

const router = express.Router();

// router.use("/cars", carsRouter );
router.use("/manufactures", manufacturesRouter );
// router.use("/types", typesRouter );

module.exports = router;
