const mongoose = require("mongoose");

(async () => {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Local DB Connection Successful!"));
})();

module.exports = { mongoose };