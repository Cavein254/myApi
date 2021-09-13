require("dotenv").config();
const blogRouter = require("./routes/blogRouter");
require("./databases/blog");
require("./models/blogModel");

const cors = require("cors");
const express = require("express");

const app = express();
const corsOptions = {
  origin: process.env.BASE_URL,
};

//Use CORS middleware
app.use(cors(corsOptions));

//To parse request content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//To parse request of content-type - application/json
app.use(express.json());

//use blog router
app.use("/api/v1/", blogRouter);

module.exports = app;
