module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "jest",
    },
    binary: {
      version: "5.0.2", //Version of MongoDB
      skipMD5: true,
    },
    autoStart: false,
  },
};
