const express = require("express");
require("dotenv").config();
require("express-async-errors");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");

const app = express(); 
const port = process.env.PORT || 3000; 

app.use(express.json());

app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 }, 
    })
);

// All routes define here
app.use("/", router);


app.use("*", notFoundURLHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); 
});
