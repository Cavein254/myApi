module.exports.config = () => {
  let setting = null;
  switch (process.env.NODE_ENV) {
    case "production":
      return (setting = { name: "production", PORT: 8080 });
    case "test":
      return (setting = {
        name: "test",
        PORT: 3311,
        MONGODB_URI: "mongodb://localhost:27017/test",
      });
    default:
      return (setting = {
        name: "development",
        PORT: 3000,
        MONGODB_URI: "mongodb://localhost:27017/blog",
      });
  }
};
