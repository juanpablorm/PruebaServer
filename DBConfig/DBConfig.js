if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
} 

const mongoose = require('mongoose');

const DBConfig = async () => {
    await mongoose.connect(process.env.DB_URL)
    .then(console.log("Base de datos conectada!"))
    .catch(error => handleError(error));
  }

  module.exports = DBConfig;