const mongoose = require("mongoose");
require("dotenv").config();

//Setting up database connection
const mongodb = process.env.MONGODB_DEV_URL;
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Create a connection
const conn = mongoose.connection;

conn.on("connected", () => {
  console.log("Mongodb successfully connected");
});

conn.on("disconnected", function () {
  console.log("Mongodb disconnection successfull");
});

//handle database connection errors
conn.on("error", console.error.bind(console, "connection error:"));
