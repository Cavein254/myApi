require("dotenv").config();
const app = require("./app");

// Port for listening for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
